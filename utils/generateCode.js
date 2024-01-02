const Voucher = require("../models/voucherModel");

exports.generateUniqueCode = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 10;

  let isCodeUnique = false;
  let generatedCode;

  while (!isCodeUnique) {
    generatedCode = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedCode += characters.charAt(randomIndex);
    }

    const existingVoucher = await Voucher.findOne({ code: generatedCode });
    isCodeUnique = !existingVoucher;
  }

  return generatedCode;
};
