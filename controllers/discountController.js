const Voucher = require("../models/voucherModel");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandlers");
const resMsg = require("../utils/resMsg");
const voucherCode = require("../utils/generateCode");

exports.generateVoucher = catchAsyncErrors(async (req, res, next) => {
  console.log("Received request for /api/discount/generate");
  try {
    const totalAmount = req.body.totalAmount;

    if (!totalAmount) {
      return next(new ErrorHandler("Total amount is required.", 400));
    }
    const uniqueCode = await voucherCode.generateUniqueCode();

    if (totalAmount >= 2000000) {
      const voucher = await Voucher.create({
        code: uniqueCode.toString(),
        value: 10000,
      });
      resMsg.sendResponse(res, 200, "true", "success", { voucher });
    } else {
      resMsg.sendResponse(res, 200, "false", "Not eligible for voucher.");
    }
  } catch (error) {
    resMsg.sendResponse(res, 500, "false", error.message);
    return next(new ErrorHandler("Kesalahan Server.", 500));
  }
});
