const { where } = require('sequelize')
const db = require('../models')
const Customer = db.Customer

exports.customer = async (req,res) => {
    try {
        const customer = await Customer.findAll();

        return res.status(201).json({
            data: customer
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

exports.createCustomer = async (req,res) => {
    const {name,date,point} = req.body

    try {
        if(!name && !date && !point){
            return res.status(401).json({
                status: 'error',
                msg: 'Missing Field'
            })
        }

        const customer = await Customer.create({
            name,
            date,
            point
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Customer created successfully',
            data: customer
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.updateCustomer = async (req,res) => {
    const {id} = req.params;

    try {
        const findCustomer = await Customer.findByPk(id);
        if(!findCustomer){
            return res.status(401).json({
                status: 'error',
                msg: 'Customer not found with that ID'
            })
        }

        const {name,date,point} = req.body

        const values = {
            name: name,
            date: date,
            point: point
        }

        const condition = {
            where: {
                id: id
            }
        }

        const options = {
            multi: true
        }

        const customerUpdated = await Customer.update(values,condition,options);

        return res.status(201).json({
            status: 'success',
            msg: 'Customer updated successfully',
            data: customerUpdated[0]
        })
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.deleteCustomer = async (req,res) => {
    const {id} = req.params;
    try {
        const findCustomer = await Customer.findByPk(id);
        console.log(findCustomer)
        if(!findCustomer){
            return res.status(401).json({
                status: 'error',
                msg: 'Customer not found with that ID'
            })
        }

        const deletedCustomer = await Customer.destroy({
            where: {id: id}
        })

        return res.status(201).json({
            status: 'success',
            msg: 'Customer deleted successfully',
            data: deletedCustomer
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.incrementPoint = async (req,res) => {
    const {id} = req.params;

    try {
        const customer = await Customer.findOne({where: {id: id}});
        if(!customer){
            return res.status(401).json({
                status: 'error',
                msg: 'Customer not found with that ID'
            })
        }

        const value = {
            point: customer.point + 1
        }

        const condition = {
            where: {
                id: id
            }
        }

        const options = {
            multi: true
        }

        const updatedPoint = await Customer.update(value, condition, options)

        return res.status(201).json({
            status: 'success',
            msg: 'Customer point updated successfully',
            point: value.point,
            data: updatedPoint[0]
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}

exports.decrementPoint = async (req,res) => {
    const {id} = req.params;

    try {
        const customer = await Customer.findOne({where: {id: id}});
        if(!customer){
            return res.status(401).json({
                status: 'error',
                msg: 'Customer not found with that ID'
            })
        }

        const value = {
            point: customer.point - 1
        }

        const condition = {
            where: {
                id: id
            }
        }

        const options = {
            multi: true
        }

        const updatedPoint = await Customer.update(value, condition, options)

        return res.status(201).json({
            status: 'success',
            msg: 'Customer point updated successfully',
            point: value.point,
            data: updatedPoint[0]
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            errors: error.message,
        });
    }
}