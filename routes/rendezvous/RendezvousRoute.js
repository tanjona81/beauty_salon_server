const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/rendezvous/RendezvousControlleur.js')

router.get('/',controlleur.getRendezvous())
router.post('/',controlleur.createRendezvous())

router.route('/:id')
    .get(controlleur.getRendezvousById())
    .put(controlleur.updateRendezvous())
    .delete(controlleur.deleteRendezvous())

module.exports = router;