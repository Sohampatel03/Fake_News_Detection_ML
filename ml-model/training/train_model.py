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

# Dataset 1: Kaggle (already binary: text,label -> 1/0)
data_kaggle = pd.read_csv("../dataset/fake_news.csv")

# Ensure correct columns
data_kaggle = data_kaggle[['text', 'label']]

# Dataset 2: Indian English (label,text -> REAL/FAKE)
data_indian = pd.read_csv("../dataset/news_dataset.csv")

# Rename columns for consistency
data_indian = data_indian.rename(columns={
    'label': 'label_text',
    'text': 'text'
})

# Convert REAL/FAKE to binary
data_indian['label'] = data_indian['label_text'].map({
    'REAL': 1,
    'FAKE': 0
})

# Keep only required columns
data_indian = data_indian[['text', 'label']]

# Drop invalid rows
data_indian = data_indian.dropna(subset=['label'])

# ================================
# 2. COMBINE DATASETS
# ================================
data = pd.concat([data_kaggle, data_indian], ignore_index=True)

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
    max_features=7000,
    ngram_range=(1, 2),
    min_df=3
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ================================
# 6. TRAIN MODEL
# ================================
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)
print(data['label'].value_counts())

# ================================
# 7. EVALUATION
# ================================
y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# ================================
# 8. SAVE MODEL & VECTORIZER
# ================================
joblib.dump(model, "../model/fake_news_model.pkl")
joblib.dump(vectorizer, "../model/tfidf_vectorizer.pkl")

print("Model and Vectorizer saved successfully.")
