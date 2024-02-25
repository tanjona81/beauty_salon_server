const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/employe/EmployeControlleur.js");
const { authJwt } = require("../../middlewares");

router.get("/list", [authJwt.verifyToken, authJwt.isManager], controlleur.getEmploye());
router.post(
  "/create",
  [authJwt.verifyToken, authJwt.isManager],
  controlleur.createEmploye()
);

router.post("/login", controlleur.loginEmploye());
router.get(
  "/rendezvous/:id",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getRendezvousEmploye()
);
router.get(
  "/rendezvousdone/:id",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getDoneRendezvousEmploye()
);
router.put(
  "/rendezvousvalidate/:id",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.validate_rendezvous()
);
router.get(
  "/commission/:id",
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
