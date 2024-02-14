const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/customer/CustomerControlleur.js')

router.get('/',controlleur.getCustomer())
router.get('/login',controlleur.loginCustomer())
router.post('/',controlleur.createCustomer())

router.route('/:id')
    .get(controlleur.getCustomerById())
    .put(controlleur.updateCustomer())
    .delete(controlleur.deleteCustomer())

module.exports = router;