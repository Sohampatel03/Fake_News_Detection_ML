import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

from preprocess import clean_text

# 1. Load dataset
data = pd.read_csv("../dataset/fake_news.csv")

# 2. Clean text
data['text'] = data['text'].apply(clean_text)

X = data['text']
y = data['label']

# 3. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. TF-IDF Vectorization
vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# 5. Train Model
model = LogisticRegression()
model.fit(X_train_vec, y_train)

# 6. Evaluate Model
y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# 7. Save Model & Vectorizer
joblib.dump(model, "../model/fake_news_model.pkl")
joblib.dump(vectorizer, "../model/tfidf_vectorizer.pkl")

print("Model and Vectorizer saved successfully.")
