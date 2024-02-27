const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/employe/EmployeControlleur.js");
const { authJwt } = require("../../middlewares");

router.get("/list", [authJwt.verifyToken], controlleur.getEmploye());
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
