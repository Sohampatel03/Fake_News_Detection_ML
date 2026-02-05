const axios = require("axios");

exports.predictNews = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    // Call Flask API
    const flaskResponse = await axios.post(
      process.env.FLASK_API_URL,
      { text }
    );

    // Directly forward ML response
    return res.status(200).json({
      prediction: flaskResponse.data.prediction,
      fake_probability: flaskResponse.data.fake_probability,
      real_probability: flaskResponse.data.real_probability,
      cleaned_text: flaskResponse.data.cleaned_text
    });

  } catch (error) {
    console.error("Prediction error:", error.message);

    return res.status(500).json({
      error: "Prediction service failed"
    });
  }
};
