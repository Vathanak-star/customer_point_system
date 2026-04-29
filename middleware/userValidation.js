const { body } = require('express-validator')

exports.validateRegister = [
    body('username').isLength({ min: 4 }).notEmpty().withMessage('Oops! Name is required.').trim().escape(),
    body('email').isEmail().notEmpty().withMessage('Oops! Email is required.').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Oops! Password must be at least 8 characters long.').trim().escape(),
];

exports.ValidateLogin = [
    body('email').isEmail().notEmpty().withMessage('Oops! Email is required.').trim().escape(),
    body('password').notEmpty().withMessage('Oops! Password is required.').trim().escape(),
];