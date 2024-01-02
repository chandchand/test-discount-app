// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chandchand:csd1234567@clusterchand.pxfddhz.mongodb.net/discountToko?retryWrites=true&w=majority",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log("Koneksi MongoDB berhasil.");
  } catch (err) {
    console.error("Gagal terhubung ke MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
