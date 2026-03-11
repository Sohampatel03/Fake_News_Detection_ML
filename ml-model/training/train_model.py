import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

from preprocess import clean_text

# ================================
# 1. LOAD DATASETS
# ================================

# Dataset 1: Kaggle (binary labels)
data_kaggle = pd.read_csv("../dataset/fake_news.csv")
data_kaggle = data_kaggle[['text', 'label']]

# Dataset 2: Indian English (REAL/FAKE labels)
data_indian = pd.read_csv("../dataset/news_dataset.csv")

data_indian = data_indian.rename(columns={
    'label': 'label_text',
    'text': 'text'
})

data_indian['label'] = data_indian['label_text'].map({
    'REAL': 1,
    'FAKE': 0
})

data_indian = data_indian[['text', 'label']]
data_indian = data_indian.dropna(subset=['label'])

# Dataset 3: Indian headlines dataset
data_headlines = pd.read_csv("../dataset/india-news-headlines.csv")

# Keep only headline column
data_headlines = data_headlines[['headline_text']]

# Rename column
data_headlines = data_headlines.rename(columns={
    'headline_text': 'text'
})

# Label all headlines as REAL (trusted news source)
data_headlines['label'] = 1

# Limit headline dataset to avoid bias
data_headlines = data_headlines.sample(n=20000, random_state=42)

# ================================
# 2. COMBINE DATASETS
# ================================
data = pd.concat([data_kaggle, data_indian, data_headlines], ignore_index=True)

print("Dataset sizes:")
print("Kaggle:", len(data_kaggle))
print("Indian:", len(data_indian))
print("Headlines:", len(data_headlines))
print("Total:", len(data))

# ================================
# 3. CLEAN TEXT
# ================================
data['text'] = data['text'].apply(clean_text)

X = data['text']
y = data['label']

# ================================
# 4. TRAIN-TEST SPLIT
# ================================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ================================
# 5. TF-IDF VECTORIZATION
# ================================
vectorizer = TfidfVectorizer(
    max_features=8000,
    ngram_range=(1,2),
    min_df=2
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ================================
# 6. TRAIN MODEL
# ================================
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

print("\nLabel distribution:")
print(data['label'].value_counts())

# ================================
# 7. EVALUATION
# ================================
y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

# ================================
# 8. SAVE MODEL & VECTORIZER
# ================================
joblib.dump(model, "../model/fake_news_model.pkl")
joblib.dump(vectorizer, "../model/tfidf_vectorizer.pkl")

print("Model and Vectorizer saved successfully.")