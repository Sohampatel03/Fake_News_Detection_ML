const express = require("express");
const cors = require("cors");
require("dotenv").config();

const predictRoutes = require("./routes/predictRoutes");

const app = express();

// REPLACE your current app.use(cors()) with this:
app.use(cors({
  origin: [
    "https://fake-news-detection-ml-kohl.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());
app.use("/api", predictRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Node backend running on port ${PORT}`);
});