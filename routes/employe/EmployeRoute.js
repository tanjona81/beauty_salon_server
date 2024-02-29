const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/employe/EmployeControlleur.js");
const { authJwt } = require("../../middlewares");
const { isManagerOrEmploye } = require("../../middlewares/authJwt.js");

router.get("/list", [authJwt.verifyToken], controlleur.getEmploye());
router.get("/list/activated", [authJwt.verifyToken], controlleur.getAllActif());
router.get("/list/rendezvous/assigne", [authJwt.verifyToken, isManagerOrEmploye], controlleur.getRdvAssigne());
router.get("/rendezvous/assigne/up-to-date", [authJwt.verifyToken, isManagerOrEmploye], controlleur.getRdvAssigneUpToDate());
router.get("/rendezvous/up-to-date", [authJwt.verifyToken, isManagerOrEmploye], controlleur.getRdvUpToDate());
router.post(
  "/create",
  [authJwt.verifyToken, authJwt.isManager],
  controlleur.createEmploye()
);

router.post("/login", controlleur.loginEmploye());
router.get(
  "/rendezvous/",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getRendezvousEmploye()
);
router.get(
  "/rendezvousdone/",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getDoneRendezvousEmploye()
);
router.put(
  "/rendezvousvalidate/",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.validate_rendezvous()
);

router.put(
  "/accept/rendezvous",
  [authJwt.verifyToken, authJwt.isEmploye],
  controlleur.acceptRdvNoEmploye()
);

router.get(
  "/commission/",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getCommission()
);

router
  .route("/employe/:id")
  .get(
    [authJwt.verifyToken, authJwt.isManagerOrEmploye],
    controlleur.getEmployeById()
  )
  .put([authJwt.verifyToken, authJwt.isManagerOrEmploye], controlleur.updateEmploye())
  .delete(
    [authJwt.verifyToken, authJwt.isManager],
    controlleur.deleteEmploye()
  );

module.exports = router;
