const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/rendezvous/RendezvousControlleur.js");
const { authJwt } = require("../../middlewares");

router.get(
  "/list",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getRendezvous()
);
router.post("/create", [authJwt.verifyToken], controlleur.createRendezvous());

router
  .route("/rendezvous/:id")
  .get(
    [authJwt.verifyToken, authJwt.isManagerOrEmploye],
    controlleur.getRendezvousById()
  )
  .put(
    [authJwt.verifyToken, authJwt.isManagerOrEmploye],
    controlleur.updateRendezvous()
  )
  .delete(
    [authJwt.verifyToken, authJwt.isManagerOrEmploye],
    controlleur.deleteRendezvous()
  );

module.exports = router;
