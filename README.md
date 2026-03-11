# TruthScan — AI-Powered Fake News Detector

<div align="center">

![TruthScan Banner](https://img.shields.io/badge/TruthScan-v2.0-fbbf24?style=for-the-badge&labelColor=0a0a0a)
![Accuracy](https://img.shields.io/badge/Model_Accuracy-94.2%25-22c55e?style=for-the-badge&labelColor=0a0a0a)
![Articles](https://img.shields.io/badge/Training_Articles-44,000+-fbbf24?style=for-the-badge&labelColor=0a0a0a)
![License](https://img.shields.io/badge/License-MIT-555?style=for-the-badge&labelColor=0a0a0a)

**Real-time fake news detection powered by Machine Learning.**
Paste any headline or full article — get an instant verdict.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [ML Model](#ml-model)
- [Dual Mode System](#dual-mode-system)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [API Reference](#api-reference)
- [Dataset](#dataset)
- [How It Works](#how-it-works)
- [Results](#results)
- [Future Improvements](#future-improvements)

---

## Overview

TruthScan is a full-stack fake news detection application that uses a trained Machine Learning model to classify news text as **Real**, **Fake**, or **Uncertain**. The system uses a **dual-mode architecture** — short headlines are analyzed using sensationalism pattern scoring, while full articles use TF-IDF + Logistic Regression classification with probability confidence scores.

The project follows a 3-tier architecture:

```
React Frontend  →  Node.js/Express Proxy  →  Flask ML API
```

---

## Live Demo

> Start all three servers (see [Getting Started](#getting-started)) and open:
> **http://localhost:3000**

---

## Features

| Feature | Description |
|---|---|
| **Dual Analysis Modes** | Headline mode (< 25 words) uses sensationalism scoring; Article mode uses ML |
| **Sensationalism Detection** | 60+ clickbait patterns, ALL-CAPS detection, excessive punctuation analysis |
| **Confidence Meter** | 5-block visual confidence indicator with HIGH / MODERATE / LOW labels |
| **Signal Breakdown** | Separate Real Signal % and Fake Signal % bars for article mode |
| **Uncertain Category** | Predictions below confidence threshold flagged for manual verification |
| **Real-time Word Counter** | Live mode indicator switches as you type |
| **Mixed Signal Warning** | Auto-warning when model confidence is below 55% |
| **Animated Landing Page** | Particle background, animated counters, news ticker |

---

## Tech Stack

### Frontend
| Tech | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Tailwind CSS | 3.x | Utility styling |
| Axios | 1.x | HTTP client |

### Backend
| Tech | Version | Purpose |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| Express | 5.x | HTTP server / proxy |
| Axios | 1.x | Forward requests to Flask |
| dotenv | 17.x | Environment variables |
| cors | 2.x | Cross-origin support |

### ML API
| Tech | Version | Purpose |
|---|---|---|
| Python | 3.8+ | Runtime |
| Flask | latest | ML API server |
| Scikit-learn | latest | TF-IDF + Logistic Regression |
| NLTK | latest | Stopword removal |
| Joblib | latest | Model serialization |

---

## Project Structure

```
truthscan/
│
├── frontend/                          # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Counter.jsx            # Animated number counter
│   │   │   ├── ParticleBg.jsx         # Canvas particle background
│   │   │   └── ResultCard.jsx         # Verdict display component
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx        # Home / marketing page
│   │   │   └── DetectionPage.jsx      # News analysis page
│   │   ├── services/
│   │   │   └── api.js                 # API call to backend
│   │   ├── App.js                     # Page router
│   │   ├── App.css                    # Global reset
│   │   └── index.js                   # React entry point
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/                           # Node.js Express proxy
│   ├── controllers/
│   │   └── predictController.js       # Forwards request to Flask
│   ├── routes/
│   │   └── predictRoutes.js           # POST /api/predict
│   ├── server.js                      # Express app entry point
│   ├── .env                           # Environment variables (create this)
│   └── package.json
│
├── flask-api/                         # Python ML microservice
│   ├── model/
│   │   ├── fake_news_model.pkl        # Trained LR model (generated)
│   │   └── tfidf_vectorizer.pkl       # Fitted vectorizer (generated)
│   ├── utils/
│   │   └── headline_features.py       # Sensationalism scoring logic
│   ├── app.py                         # Flask API entry point
│   └── requirements.txt
│
├── ml-model/                          # Model training scripts
│   ├── dataset/
│   │   └── prepare_dataset.py         # Merge Kaggle datasets
│   ├── training/
│   │   ├── preprocess.py              # Text cleaning functions
│   │   └── train_model.py             # Full training pipeline
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│                     React App :3000                         │
│   LandingPage  ──►  DetectionPage  ──►  ResultCard          │
└──────────────────────────┬──────────────────────────────────┘
                           │ POST /api/predict
                           │ { text: "..." }
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Node.js / Express :5001                    │
│              predictController.js (proxy layer)             │
│   • Input validation                                        │
│   • Forwards to Flask                                       │
│   • Returns ML response                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ POST /predict
                           │ { text: "..." }
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Flask API :5000                          │
│                        app.py                               │
│   • clean_text()  →  remove stopwords, lowercase           │
│   • word count check  →  headline or article mode          │
│   • TF-IDF vectorize  →  8000 features, bigrams            │
│   • LR predict  →  [fake_prob, real_prob]                  │
│   • Threshold logic  →  Real / Fake / Uncertain            │
└──────────────────────────┬──────────────────────────────────┘
                           │ loads .pkl files
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Trained ML Model                          │
│         fake_news_model.pkl + tfidf_vectorizer.pkl          │
│         Logistic Regression — 94.2% accuracy               │
└─────────────────────────────────────────────────────────────┘
```

---

## ML Model

### Algorithm
**Logistic Regression** with **TF-IDF** feature extraction.

Logistic Regression was chosen over heavier models (BERT, LSTM) because:
- Sub-second inference time (real-time requirement)
- High interpretability
- Strong performance on TF-IDF text features
- Low memory footprint for deployment

### Text Preprocessing Pipeline

```python
def clean_text(text):
    text = text.lower()                          # 1. Lowercase
    text = re.sub(r'[^a-zA-Z]', ' ', text)      # 2. Remove non-alpha
    words = text.split()
    words = [w for w in words                    # 3. Remove stopwords
             if w not in stop_words]
    return ' '.join(words)
```

### TF-IDF Configuration

```python
TfidfVectorizer(
    max_features=8000,    # Top 8000 most informative terms
    ngram_range=(1, 2),   # Unigrams + bigrams
    min_df=2              # Ignore terms appearing in < 2 docs (reduces noise)
)
```

### Training

```python
LogisticRegression(max_iter=1000)

# Train/test split
train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
```

`stratify=y` ensures both classes are proportionally represented in train and test sets, preventing class imbalance issues.

### Classification Thresholds

```python
# Article mode
if real_prob >= 0.65:   → "Real News"
if fake_prob >= 0.65:   → "Fake News"
else:                   → "Uncertain / Needs Verification"

# Headline mode (weighted combination)
final_fake_score = fake_prob * 0.7 + sensationalism_score * 0.3
if final_fake_score >= 0.65:    → "Fake News"
if real_score >= 0.40:          → "Real News"
else:                           → "Uncertain / Needs Verification"
```

---

## Dual Mode System

This is TruthScan's most unique feature. The system automatically switches analysis strategy based on the input length.

### Headline Mode (< 25 words)

Full articles have enough linguistic context for ML classification. Headlines do not — they are too short for TF-IDF to work reliably. Instead, headlines are scored using a **Sensationalism Heuristic**:

```python
final_score = (ML_fake_prob × 0.7) + (sensationalism_score × 0.3)
```

**Sensationalism scoring checks:**

| Signal | Weight | Examples |
|---|---|---|
| Sensational keywords | +0.12 per match | "shocking", "bombshell", "leaked", "exposed" |
| ALL-CAPS words (4+ chars) | +0.08 per match | "BREAKING", "HOAX" |
| Clickbait phrases | +0.18 flat | "you won't believe", "watch before removed" |
| Excessive punctuation | +0.12 flat | `!!!`, `???` |

**60+ tracked keywords** across categories: clickbait, conspiracy, miracle cures, fear/panic, political manipulation, health misinformation, money scams.

### Article Mode (≥ 25 words)

Standard ML pipeline: `clean_text → TF-IDF → Logistic Regression → probability thresholds`

### Frontend Rendering Difference

| Mode | What is shown |
|---|---|
| Headline | Verdict label only (REAL / FAKE / UNCERTAIN) |
| Article | Verdict + Confidence Meter (5 blocks) + Signal Breakdown bars |

---

## Getting Started

### Prerequisites

Make sure you have these installed:

- **Node.js** v18 or higher
- **Python** 3.8 or higher
- **pip**
- **npm**

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/truthscan.git
cd truthscan
```

#### 2. Install Frontend dependencies

```bash
cd frontend
npm install
cd ..
```

#### 3. Install Backend dependencies

```bash
cd backend
npm install
cd ..
```

#### 4. Install Flask API dependencies

```bash
cd flask-api
pip install -r requirements.txt
```

Also download NLTK stopwords (first time only):

```python
python3 -c "import nltk; nltk.download('stopwords')"
```

#### 5. Create backend `.env` file

Create `backend/.env`:

```env
PORT=5001
FLASK_API_URL=http://localhost:5000/predict
```

#### 6. Train the ML model (if `.pkl` files don't exist)

Download datasets from Kaggle and place them in `ml-model/dataset/`:
- `Fake.csv` and `True.csv` — [Fake and real news dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset)
- `news_dataset.csv` — Indian English news with REAL/FAKE labels
- `india-news-headlines.csv` — Indian news headlines

Then run:

```bash
cd ml-model/dataset
python prepare_dataset.py

cd ../training
python train_model.py
```

The trained files will be saved to `flask-api/model/`:
- `fake_news_model.pkl`
- `tfidf_vectorizer.pkl`

---

### Running the Project

You need **3 terminals** running simultaneously.

#### Terminal 1 — Flask ML API

```bash
cd flask-api
python app.py
```

> Runs on: **http://localhost:5000**

#### Terminal 2 — Node.js Backend

```bash
cd backend
npm run dev
```

> Runs on: **http://localhost:5001**

#### Terminal 3 — React Frontend

```bash
cd frontend
npm start
```

> Runs on: **http://localhost:3000**

Open **http://localhost:3000** in your browser.

---

## API Reference

### Node.js Backend

#### `POST /api/predict`

Accepts news text and returns a prediction.

**Request:**
```json
{
  "text": "Scientists discover shocking cure for cancer doctors don't want you to know!!!"
}
```

**Response (Headline mode):**
```json
{
  "prediction": "Fake News",
  "fake_probability": 0.7892,
  "real_probability": 0.2108,
  "mode": "headline_analysis"
}
```

**Response (Article mode):**
```json
{
  "prediction": "Real News",
  "fake_probability": 0.2341,
  "real_probability": 0.7659,
  "mode": "article_analysis"
}
```

**Response (Uncertain):**
```json
{
  "prediction": "Uncertain / Needs Verification",
  "fake_probability": 0.5120,
  "real_probability": 0.4880,
  "mode": "article_analysis"
}
```

**Error Response:**
```json
{
  "error": "Text is required"
}
```

### Flask API (internal)

#### `GET /`
Health check — returns `"✅ Fake News Detection ML API is running"`

#### `POST /predict`
Same request/response format as above. Called internally by Node.js.

---

## Dataset

| Dataset | Source | Size | Labels |
|---|---|---|---|
| Fake & Real News (Kaggle) | Kaggle | ~44,000 articles | 0 = Fake, 1 = Real |
| Indian English News | Custom | varies | REAL / FAKE |
| India News Headlines | AIR News | 20,000 headlines | 1 = Real (trusted source) |

**Final combined training data: ~44,000+ samples**

Label distribution after combining:
- `1` (Real): ~57%
- `0` (Fake): ~43%

`stratify=y` in `train_test_split` ensures this ratio is preserved in both train and test sets.

---

## How It Works

### Step-by-step flow for an article input:

```
User pastes text
       │
       ▼
React DetectionPage
  → POST http://localhost:5001/api/predict { text }
       │
       ▼
Node.js predictController.js
  → validates text is non-empty
  → forwards to Flask: POST http://localhost:5000/predict
       │
       ▼
Flask app.py
  → clean_text(text)          # lowercase, remove punct, remove stopwords
  → word_count = len(cleaned.split())
       │
  ┌────┴────────────────────────────┐
  │ word_count < 25                 │ word_count >= 25
  ▼                                 ▼
HEADLINE MODE                  ARTICLE MODE
  → sensationalism_score()       → vectorizer.transform()
  → weighted combination         → model.predict_proba()
  → threshold check              → threshold check (0.65)
       │                                │
       └───────────┬────────────────────┘
                   ▼
         { prediction, fake_probability,
           real_probability, mode }
                   │
                   ▼
         Node.js forwards response
                   │
                   ▼
         React ResultCard renders verdict
```

---

## Results

| Metric | Value |
|---|---|
| **Test Accuracy** | 94.2% |
| **Train/Test Split** | 80 / 20 |
| **Vectorizer Features** | 8,000 |
| **N-gram Range** | (1, 2) — unigrams + bigrams |
| **Training Samples** | ~35,200 |
| **Test Samples** | ~8,800 |

---

## Future Improvements

- [ ] **Multilingual support** — Hindi, Urdu, Bengali news detection
- [ ] **URL input** — paste a news URL and auto-fetch the article
- [ ] **Browser extension** — highlight fake news inline while browsing
- [ ] **BERT/RoBERTa model** — replace LR with transformer-based model for higher accuracy
- [ ] **Explainability** — show which words contributed most to the prediction (LIME / SHAP)
- [ ] **User feedback loop** — thumbs up/down on predictions to improve model over time
- [ ] **Database logging** — store predictions for analytics dashboard
- [ ] **Rate limiting** — protect API from abuse
- [ ] **Docker Compose** — one-command startup for all 3 services

---

## License

This project is licensed under the MIT License.

---

<div align="center">

Built with React · Flask · Scikit-learn

**TruthScan** — Because truth matters.

</div>