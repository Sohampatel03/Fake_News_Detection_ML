const express = require("express");
const router = express.Router();
const { predictNews } = require("../controllers/predictController");
const axios = require("axios");

router.post("/predict", predictNews);

// Ping route - wakes up Flask and confirms chain is alive
router.get("/ping", async (req, res) => {
  try {
    const flaskBase = (process.env.FLASK_API_URL || "").replace("/predict", "");
    await axios.get(flaskBase, { timeout: 25000 });
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    return res.status(503).json({ status: "waking", error: err.message });
  }
});

module.exports = router;