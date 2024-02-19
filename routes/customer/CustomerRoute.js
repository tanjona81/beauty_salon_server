const express = require("express");
const router = express.Router();
const controlleur = require("../../controlleurs/customer/CustomerControlleur.js");
const { authJwt } = require("../../middlewares");

router.get(
  "/list",
  [authJwt.verifyToken, authJwt.isManagerOrEmploye],
  controlleur.getCustomer()
);
router.post("/login", controlleur.loginCustomer());
router.post("/create", controlleur.createCustomer());
router.post("/payment", controlleur.payment());

router
  .route("/customer/:id")
  .get([authJwt.verifyToken], controlleur.getCustomerById())
  .put([authJwt.verifyToken], controlleur.updateCustomer())
  .delete(
    [authJwt.verifyToken, authJwt.isManager],
    controlleur.deleteCustomer()
  );

module.exports = router;
