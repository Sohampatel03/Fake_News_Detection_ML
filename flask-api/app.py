from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os
import nltk
from nltk.corpus import stopwords
from utils.headline_features import sensationalism_score

# ---------------------------
# Flask app setup
# ---------------------------
app = Flask(__name__)
CORS(app)
nltk.download('stopwords')
# ---------------------------
# Load stopwords
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

    if cleaned_text.strip() == "":
        return jsonify({
            "prediction": "Uncertain / Needs Verification",
            "reason": "Invalid or empty text"
        })

    vectorized_text = vectorizer.transform([cleaned_text])

    # Model probabilities
    proba = model.predict_proba(vectorized_text)[0]
    fake_prob = float(proba[0])
    real_prob = float(proba[1])

    word_count = len(cleaned_text.split())

    # ---------------------------
    # HEADLINE MODE
    # ---------------------------
    if word_count < 25:

        sens_score = sensationalism_score(news_text)

        final_fake_score = fake_prob * 0.7 + sens_score * 0.3

        real_score = 1 - final_fake_score

        if final_fake_score >= 0.65:
            result = "Fake News"
        
        elif real_score >= 0.40:
            result = "Real News"
        
        else:
            result = "Uncertain / Needs Verification"

        return jsonify({
            "prediction": result,
            "fake_probability": round(final_fake_score, 4),
            "real_probability": round(1 - final_fake_score, 4),
            "mode": "headline_analysis"
        })

    # ---------------------------
    # ARTICLE MODE
    # ---------------------------
    else:

        if real_prob >= 0.50:
            result = "Real News"
        elif fake_prob >= 0.60:
            result = "Fake News"
        else:
            result = "Uncertain / Needs Verification"

        return jsonify({
            "prediction": result,
            "fake_probability": round(fake_prob, 4),
            "real_probability": round(real_prob, 4),
            "mode": "article_analysis"
        })

# ---------------------------
# Run server
# ---------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
