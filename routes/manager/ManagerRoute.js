const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/manager/ManagerControlleur.js')

router.get('/',controlleur.getManager())
router.get('/login',controlleur.loginManager())
router.post('/',controlleur.createManager())

router.get('/CA',controlleur.getCAMinusCost())

router.get('/statistique/employe',controlleur.getTempsMoyenTravailPourChaqueEmpoye())
router.get('/statistique/reservation-jour',controlleur.getNbrRdv_jour())
router.get('/statistique/reservation-mois',controlleur.getNbrRdv_mois())
router.get('/statistique/ca-jour',controlleur.getChiffreAffaire_jour())
router.get('/statistique/ca-mois',controlleur.getChiffreAffaire_mois())

router.route('/:id')
    .get(controlleur.getManagerById())
    .put(controlleur.updateManager())
    .delete(controlleur.deleteManager())

module.exports = router;