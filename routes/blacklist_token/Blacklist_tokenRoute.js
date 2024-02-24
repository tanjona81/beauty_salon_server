const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/blacklist_token/Blacklist_tokenControlleur.js");

router.post("/deconnection", controlleur.createBlacklist_token());
router.get("/check", controlleur.verifyBlacklist_token());

module.exports = router;
