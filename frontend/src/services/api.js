import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api"
});

export const predictNews = (text) =>
  API.post("/predict", { text });
