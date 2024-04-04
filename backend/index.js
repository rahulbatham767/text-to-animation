const express = require("express");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // or specify allowed origins
    methods: ["GET", "POST"], // specify allowed HTTP methods
  })
);

// Routes
app.use("/api/v1/user", require("./routes/UserRoute")); // Assuming this file exists
app.use("/api/v1/feedback", require("./routes/FeedbackRouter")); // Assuming this file exists
app.use("/api/v1/video", require("./routes/Video")); // Assuming this file exists

// Start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB" + err);
  });
