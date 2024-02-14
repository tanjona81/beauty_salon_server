const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/service/ServiceControlleur.js')

router.get('/',controlleur.getService())
router.post('/',controlleur.createService())

router.route('/:id')
    .get(controlleur.getServiceById())
    .put(controlleur.updateService())
    .delete(controlleur.deleteService())

module.exports = router;