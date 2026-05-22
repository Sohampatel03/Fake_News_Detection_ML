const express = require("express");
const cors = require("cors");
require("dotenv").config();

const predictRoutes = require("./routes/predictRoutes");

const app = express();

app.use(cors({
  origin: [
    "fake-news-detection-ml-kohl.vercel.app",
    "http://localhost:3000"  // keep for local dev
  ]
}));
app.use(express.json());

app.use("/api", predictRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Node backend running on port ${PORT}`);
});
