const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/preference/PreferenceControlleur.js')
const { authJwt } = require("../../middlewares");

router.get('/', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreference())
router.post('/', [authJwt.verifyToken, authJwt.isCustomer], controlleur.createPreference())

router.get('/employes', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreferenceEmploye())
router.get('/services', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreferenceService())
router.get('/all-services', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getAllServicePlusPreference())

router.route('/:id')
    .get([authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreferenceById())
    .put([authJwt.verifyToken, authJwt.isCustomer], controlleur.updatePreference())
    .delete([authJwt.verifyToken, authJwt.isCustomer], controlleur.deletePreference())

module.exports = router;