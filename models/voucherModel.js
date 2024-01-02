const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { 
    type: String, 
    unique: true 
  },
  value: Number,
  isUsed: { 
    type: Boolean, 
    default: false },
  expirationDate: { 
    type: Date, 
    default: () => new Date(+new Date() + 3 * 30 * 24 * 60 * 60 * 1000) 
  }, 
});

module.exports = mongoose.model('Voucher', voucherSchema);
