📰 Fake News Detection Using Machine Learning

A full-stack web application that detects whether a news article is Fake or Real using Machine Learning, deployed via a Flask API and integrated with a MERN stack frontend.

📌 Project Overview

The rapid spread of fake news on social media and online platforms has become a serious problem.
This project aims to build an automated Fake News Detection System that classifies news articles using text-based machine learning techniques.

The system takes news text as input and predicts:

Fake News

Real News

along with confidence probabilities.

🎯 Objectives

To detect fake and real news automatically

To train a supervised machine learning model on labeled news data

To deploy the trained model using a REST API

To integrate ML predictions with a full-stack web application

To display prediction confidence to the user

🛠️ Technology Stack
Frontend

React.js

Tailwind CSS

Axios

Backend

Node.js

Express.js

Machine Learning

Python

Scikit-learn

NLTK

Flask

Database (optional / future use)

MongoDB

🧱 Project Architecture
React Frontend
      ↓
Node.js Backend (Express API)
      ↓
Flask ML API
      ↓
Trained ML Model
      ↓
Prediction + Probability

📁 Project Folder Structure
Fake-News-Detection/
│
├── ml-model/
│   ├── dataset/
│   │   └── fake_news.csv
│   ├── training/
│   │   ├── preprocess.py
│   │   └── train_model.py
│   ├── model/
│   │   ├── fake_news_model.pkl
│   │   └── tfidf_vectorizer.pkl
│   └── requirements.txt
│
├── flask-api/
│   ├── app.py
│   ├── model/
│   │   ├── fake_news_model.pkl
│   │   └── tfidf_vectorizer.pkl
│   └── requirements.txt
│
├── backend/
│   ├── controllers/
│   │   └── predictController.js
│   ├── routes/
│   │   └── predictRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── src/
│       ├── components/
│       │   └── NewsForm.jsx
│       ├── services/
│       │   └── api.js
│       └── App.jsx
│
└── README.md

🤖 Machine Learning Workflow

Dataset collection (Kaggle Fake News Dataset)

Text preprocessing:

Lowercasing

Removing punctuation

Stopword removal

Feature extraction using TF-IDF Vectorization

Model training using Logistic Regression

Model evaluation using accuracy

Saving trained model and vectorizer

Deploying model via Flask API

Model Accuracy: ~98%

🚀 How to Run the Project
1️⃣ Train the Machine Learning Model
cd ml-model
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
cd training
python train_model.py

2️⃣ Run Flask ML API
cd flask-api
pip install -r requirements.txt
python app.py


Flask runs at:

http://127.0.0.1:5000

3️⃣ Run Node.js Backend
cd backend
npm install
npm run dev


Backend runs at:

http://localhost:5001

4️⃣ Run React Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

📊 API Response Example
{
  "prediction": "Real News",
  "fake_probability": 0.0213,
  "real_probability": 0.9787
}

✨ Features

User-friendly interface

Real-time fake news detection

Prediction confidence visualization

Modular and scalable architecture

Separation of training and prediction logic

⚠️ Limitations

Text-based classification only (no fact verification)

Model performance depends on dataset quality

Single-language (English) support

🔮 Future Enhancements

Deep Learning models (LSTM, BERT)

Multilingual fake news detection

MongoDB integration for history tracking

Social media API integration

Chrome extension for real-time detection

🧠 Key Learning Outcomes

Machine Learning model training and deployment

REST API development with Flask

MERN stack integration

Handling real-world ML prediction pipelines

Confidence-based result visualization

📌 Conclusion

This project demonstrates how Machine Learning can be effectively integrated with modern web technologies to solve real-world problems like fake news detection. The modular design allows easy scalability and future improvements.