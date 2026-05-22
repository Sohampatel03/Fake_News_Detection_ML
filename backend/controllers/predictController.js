// backend/controllers/predictController.js
const axios = require("axios");

exports.predictNews = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }

    console.log("📡 Calling Flask at:", process.env.FLASK_API_URL); // ADD THIS

    const flaskResponse = await axios.post(
      process.env.FLASK_API_URL,
      { text },
      { timeout: 30000 } // ADD THIS - Render free tier is slow, needs longer timeout
    );

    return res.status(200).json({
      prediction: flaskResponse.data.prediction,
      fake_probability: flaskResponse.data.fake_probability,
      real_probability: flaskResponse.data.real_probability,
      cleaned_text: flaskResponse.data.cleaned_text
    });

  } catch (error) {
    // REPLACE generic log with detailed one
    console.error("Prediction error:", error.message);
    console.error("Flask URL used:", process.env.FLASK_API_URL);
    console.error("Axios error details:", error.response?.data || error.code);

    return res.status(500).json({
      error: "Prediction service failed",
      detail: error.message,        // ADD THIS for debugging
      flaskUrl: process.env.FLASK_API_URL  // ADD THIS for debugging
    });
  }
};