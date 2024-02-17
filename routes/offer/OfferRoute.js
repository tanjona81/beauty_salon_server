const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/offer/OfferControlleur.js')

router.get('/',controlleur.getOffer())
router.post('/',controlleur.createOffer())

router.route('/:id')
    .get(controlleur.getOfferById())
    .put(controlleur.updateOffer())
    .delete(controlleur.deleteOffer())

module.exports = router;