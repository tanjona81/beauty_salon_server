const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/employe/EmployeControlleur.js')

router.get('/',controlleur.getEmploye())
router.post('/',controlleur.createEmploye())

router.get('/login',controlleur.loginEmploye())
router.get('/rendezvous/:id',controlleur.getRendezvousEmploye())
router.get('/rendezvousdone/:id',controlleur.getDoneRendezvousEmploye())
router.put('/rendezvousvalidate/:id',controlleur.validate_rendezvous())
router.get('/commission/:id',controlleur.getCommission())

router.route('/:id')
    .get(controlleur.getEmployeById())
    .put(controlleur.updateEmploye())
    .delete(controlleur.deleteEmploye())

module.exports = router;