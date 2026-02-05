import pandas as pd

# Load Kaggle datasets
fake = pd.read_csv("Fake.csv")
true = pd.read_csv("True.csv")

# Add labels
fake["label"] = 0
true["label"] = 1

# Keep only required columns
fake = fake[["text", "label"]]
true = true[["text", "label"]]

# Merge & shuffle
data = pd.concat([fake, true])
data = data.sample(frac=1).reset_index(drop=True)

# Save final dataset
data.to_csv("fake_news.csv", index=False)

print("✅ fake_news.csv created successfully")
print(data.head())
