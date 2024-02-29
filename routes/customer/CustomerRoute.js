const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/customer/CustomerControlleur.js");
const { authJwt } = require("../../middlewares");

router.get(
  "/list",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getCustomer()
);
router.get(
  "/limit",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getAllLimit()
);
router.get(
  "/search/name",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.searchByName()
);
router.post("/login", controlleur.loginCustomer());
router.post("/create", controlleur.createCustomer());
router.post("/payment", [authJwt.verifyToken, authJwt.isCustomer], controlleur.payment());
router.get("/history/rendezvous", [authJwt.verifyToken, authJwt.isCustomer], controlleur.getHistoryRendezvous());
router.get("/not-paid/rendezvous", [authJwt.verifyToken, authJwt.isCustomer], controlleur.getNotPaid());

router
  .route("/customer/:id")
  .get([authJwt.verifyToken], controlleur.getCustomerById())
  .put([authJwt.verifyToken, authJwt.isCustomer], controlleur.updateCustomer())
  .delete(
    [authJwt.verifyToken, authJwt.isManager],
    controlleur.deleteCustomer()
  );

module.exports = router;
