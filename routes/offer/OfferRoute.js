const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/offer/OfferControlleur.js')
const { authJwt } = require("../../middlewares");

router.get('/', [authJwt.verifyToken, authJwt.isManager], controlleur.getOffer())
router.post('/', [authJwt.verifyToken, authJwt.isManager], controlleur.createOffer())

router.get('/up-to-date', [authJwt.verifyToken, authJwt.isManager], controlleur.getOfferUpToDate())

router.route('/:id')
    .get([authJwt.verifyToken, authJwt.isManager], controlleur.getOfferById())
    .put([authJwt.verifyToken, authJwt.isManager], controlleur.updateOffer())
    .delete([authJwt.verifyToken, authJwt.isManager], controlleur.deleteOffer())

module.exports = router;