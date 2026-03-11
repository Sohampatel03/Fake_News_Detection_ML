export const predictNews = async (text) => {
  const res = await fetch("http://localhost:5001/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Prediction failed");

  return res.json();
};