const express = require('express');
const router = express.Router();
const controlleur = require('../../controlleurs/manager/ManagerControlleur.js')

router.get('/',controlleur.getManager())
router.get('/login',controlleur.loginManager())
router.post('/',controlleur.createManager())

router.route('/:id')
    .get(controlleur.getManagerById())
    .put(controlleur.updateManager())
    .delete(controlleur.deleteManager())

module.exports = router;