// Import necessary modules
const express = require("express");
const { body, validationResult } = require("express-validator");
const Feedback = require("../Model/Feedback"); // Assuming you have a Feedback model defined

// Create a router instance
const router = express.Router();

// Define validation rules for the feedback data
const feedbackValidationRules = [
  body("starRating").isInt({ min: 1, max: 5 }),
  body("feedbackText").notEmpty(),
];

// Route to handle feedback submission
router.post("/", feedbackValidationRules, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract feedback data from request body
  const { starRating, feedbackText } = req.body;
  console.log(req.body);

  try {
    // Create a new Feedback document
    const feedback = new Feedback({ starRating, feedbackText });
    await feedback.save();

    // Respond with success message
    return res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    // Respond with server error message
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router to use in your main application file
module.exports = router;
