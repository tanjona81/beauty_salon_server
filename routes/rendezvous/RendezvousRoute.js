const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/rendezvous/RendezvousControlleur.js");
const { authJwt } = require("../../middlewares");

router.get(
  "/list",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getRendezvous()
);

router.get(
  "/populated",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getAllrdvJoin()
);

router.get(
  "/no-employe",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getRendezvousNoEmploye()
);

router.get(
  "/no-employe/up-date",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getRendezvousNoEmployeUpToDate()
);

router.post("/create", [authJwt.verifyToken], controlleur.createRendezvous());

router.post("/create/rendezvous-no-employe", [authJwt.verifyToken], 
  controlleur.createRendezvousNoEmploye());

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
