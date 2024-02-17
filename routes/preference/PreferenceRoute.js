const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/preference/PreferenceControlleur.js')

router.get('/',controlleur.getPreference())
router.post('/',controlleur.createPreference())

router.get('/employes/:id',controlleur.getPreferenceEmploye())
router.get('/services/:id',controlleur.getPreferenceService())

router.route('/:id')
    .get(controlleur.getPreferenceById())
    .put(controlleur.updatePreference())
    .delete(controlleur.deletePreference())

module.exports = router;