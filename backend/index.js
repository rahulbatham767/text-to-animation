const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    Credential: true,
  })
);

app.use("/api/v1/user", require("./routes/UserRoute"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Not Connected to MongoDb" + err);
  });
