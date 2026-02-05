from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os
from nltk.corpus import stopwords

# ---------------------------
# Flask app setup
# ---------------------------
app = Flask(__name__)
CORS(app)

# ---------------------------
# Load stopwords (NO download here)
# ---------------------------
stop_words = set(stopwords.words('english'))

# ---------------------------
# Absolute path handling
# ---------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model/fake_news_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "model/tfidf_vectorizer.pkl"))

# ---------------------------
# Text cleaning (SAME AS TRAINING)
# ---------------------------
def clean_text(text):
    if not isinstance(text, str):
        return ""

    text = text.lower()
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return ' '.join(words)

# ---------------------------
# Routes
# ---------------------------
@app.route("/")
def home():
    return "✅ Fake News Detection ML API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "Text field is required"}), 400

    news_text = data["text"]

    cleaned_text = clean_text(news_text)

    # Safety check
    if cleaned_text.strip() == "":
        return jsonify({
            "prediction": "Fake News",
            "reason": "Text too short or invalid after preprocessing"
        })

    vectorized_text = vectorizer.transform([cleaned_text])

    prediction = model.predict(vectorized_text)[0]
    probabilities = model.predict_proba(vectorized_text)[0]

    result = "Real News" if prediction == 1 else "Fake News"

    return jsonify({
        "prediction": result,
        "fake_probability": round(float(probabilities[0]), 4),
        "real_probability": round(float(probabilities[1]), 4),
        "cleaned_text": cleaned_text
    })

# ---------------------------
# Run server
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
