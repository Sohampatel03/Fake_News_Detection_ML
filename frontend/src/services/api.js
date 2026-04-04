// export const predictNews = async (text) => {
//   const res = await fetch("http://localhost:5001/api/predict", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ text }),
//   });

//   if (!res.ok) throw new Error("Prediction failed");

//   return res.json();
// };

// frontend/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export const predictNews = async (text) => {
  const res = await fetch(`${API_BASE_URL}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
};