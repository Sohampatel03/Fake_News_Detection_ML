const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5001").replace(/\/$/, "");

// ADD THIS - check what URL is actually being used
console.log("🔍 API_BASE_URL:", API_BASE_URL);

export const predictNews = async (text) => {
  const res = await fetch(`${API_BASE_URL}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
};