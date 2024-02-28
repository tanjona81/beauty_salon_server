const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/preference/PreferenceControlleur.js')
const { authJwt } = require("../../middlewares");

router.get('/', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreference())
router.post('/', [authJwt.verifyToken, authJwt.isCustomer], controlleur.createPreference())

router.post('/delete', [authJwt.verifyToken, authJwt.isCustomer], controlleur.find_and_delete_preference())

router.get('/employes', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreferenceEmploye())
router.get('/services', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreferenceService())
router.get('/all-services', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getAllServicePlusPreference())
router.get('/all-employes', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getAllEmployePlusPreference())
router.get('/all-employes/activated', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getAllEmployeActifPlusPreference())
router.get('/all-services/activated', [authJwt.verifyToken, authJwt.isCustomer], controlleur.getAllServiceAcitfPlusPreference())

router.route('/:id')
    .get([authJwt.verifyToken, authJwt.isCustomer], controlleur.getPreferenceById())
    .put([authJwt.verifyToken, authJwt.isCustomer], controlleur.updatePreference())
    .delete([authJwt.verifyToken, authJwt.isCustomer], controlleur.deletePreference())

module.exports = router;