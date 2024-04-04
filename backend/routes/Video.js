// routes/videos.js

const express = require("express");
const router = express.Router();
const Video = require("../Model/Video");

router.get("/", async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find();

    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST route to save a video link
router.post("/", async (req, res) => {
  try {
    const { title, url } = req.body;

    // Create a new video document
    const video = new Video({
      title,
      url,
    });

    // Save the video to the database
    await video.save();

    res.status(201).json({ success: true, video });
  } catch (error) {
    console.error("Error saving video:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
