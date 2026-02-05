import { useState } from "react";
import { predictNews } from "../services/api";

const NewsForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await predictNews(text);
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-4">
        Fake News Detection
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          placeholder="Paste news text here..."
          className="w-full p-3 border rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-md"
        >
          {loading ? "Analyzing..." : "Check News"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded-md">
          <h2
            className={`text-xl font-bold ${
              result.prediction === "Real News"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {result.prediction}
          </h2>

          <div className="mt-3">
            <p className="text-sm">
              Fake Probability:{" "}
              <span className="font-semibold text-red-600">
                {(result.fake_probability * 100).toFixed(2)}%
              </span>
            </p>
            <p className="text-sm">
              Real Probability:{" "}
              <span className="font-semibold text-green-600">
                {(result.real_probability * 100).toFixed(2)}%
              </span>
            </p>
          </div>

          <div className="mt-4">
            <div className="h-3 bg-gray-200 rounded">
              <div
                className="h-3 bg-green-500 rounded"
                style={{
                  width: `${result.real_probability * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsForm;
