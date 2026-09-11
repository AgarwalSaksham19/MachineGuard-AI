import pandas as pd
import joblib
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    ConfusionMatrixDisplay,
    confusion_matrix
)

# Load dataset
df = pd.read_csv("dataset/ai4i2020.csv")

# Encode Machine Type
encoder = LabelEncoder()
df["Type"] = encoder.fit_transform(df["Type"])
joblib.dump(encoder, "encoder.pkl")

# Keep only the features we actually want users to enter
features = [
    "Type",
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]"
]

X = df[features]
y = df["Machine failure"]

joblib.dump(features, "feature_names.pkl")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print(f"Accuracy: {accuracy_score(y_test, y_pred)*100:.2f}%")
print(classification_report(y_test, y_pred))

ConfusionMatrixDisplay(
    confusion_matrix(y_test, y_pred)
).plot()

plt.savefig("confusion_matrix.png")
plt.close()

joblib.dump(model, "model.pkl")

print("Model Saved Successfully!")