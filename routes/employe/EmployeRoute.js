const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/employe/EmployeControlleur.js')

router.get('/',controlleur.getEmploye())
router.get('/login',controlleur.loginEmploye())
router.post('/',controlleur.createEmploye())

router.route('/:id')
    .get(controlleur.getEmployeById())
    .put(controlleur.updateEmploye())
    .delete(controlleur.deleteEmploye())

module.exports = router;