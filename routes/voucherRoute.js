const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");

router.post("/generateVoucher", (req, res, next) => {
  console.log("Received request for /generateVoucher");
  discountController.generateVoucher(req, res, next);
  console.log("Request processed for /generateVoucher");
});

module.exports = router;
