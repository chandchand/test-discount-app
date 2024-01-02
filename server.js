// server.js
const express = require("express");
const dotenv = require("dotenv");
const ErrorHandler = require("./utils/errorHandlers");
const error = require("./middlewares/errorMiddleware");
const db = require("./config/db");
const next = require("next");

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const port = process.env.PORT || 3000;
  const app = express();
  db();

  const discount = require("./routes/voucherRoute");

  app.use(express.json());

  app.use("/api/discount", discount);

  // Serve the Next.js app for other routes
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
