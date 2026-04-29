const {Router} = require('express');
const { createCustomer, updateCustomer, deleteCustomer, incrementPoint, decrementPoint, customer } = require('../controllers/customerController');

const router = Router()

router.get('/customer',customer);

router.post('/createCustomer',createCustomer);
router.post('/updateCustomer/:id',updateCustomer);
router.delete('/deleteCustomer/:id',deleteCustomer)

router.post('/addPoint/:id',incrementPoint);
router.post('/minusPoint/:id',decrementPoint);

module.exports = router;
