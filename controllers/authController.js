const { validationResult } = require('express-validator')
const db = require('../models')
const jwt = require('jsonwebtoken')
const { hashing, hashValidation } = require('../middleware/hashing')
const { where } = require('sequelize')
require('dotenv').config()

const User = db.User;
const saltRound = 10;

exports.validateToken = async (req,res) => {
    return res.status(201).json({
        status: 'success',
        msg: 'token Validated'
    })
}

exports.user = async (req,res) => {
        try {
            const user = await User.findAll();
    
            return res.status(201).json({
                status: 'success',
                data: user
            })
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                status: 'error',
                msg: 'Internal server error.',
                errors: error.message,
            });
        }
}

exports.register = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }

    const {username,email,password} = req.body;

    try {
        const existingUser = await User.findOne({where: {email}})
        if(existingUser){
            return res.status(409).json({
                status: 'error',
                msg: 'User with this email already exists'
            })
        }

        const hashedPassword = await hashing(password,saltRound);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        )

        return res.status(201).json({
            status: 'success',
            msg: 'User created successfully',
            data: {
                id: user.id,
                name: user.username,
                email: user.email,
                token,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.login = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }

    const {email,password} = req.body;

    try {
        const user = await User.findOne({where: {email: email}});

        if(!user){
            return res.status(401).json({
                status: 'error',
                msg: 'Email not found',
                errors: [{msg: "Invalid credentails"}]
            })
        }

        const hashPasswordValidation = await hashValidation(password,user.password)
        if(!hashPasswordValidation){
            return res.status(404).json({
                status: 'error',
                msg: 'Invalid credentials',
                errors: [{msg: "Invalid credentails"}]
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        )

        return res.status(201).json({
            status: 'success',
            msg: 'User login successfully',
            data: {
                id: user.id,
                name: user.username,
                email: user.email,
                token,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}