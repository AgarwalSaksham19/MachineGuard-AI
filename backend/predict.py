import joblib
import numpy as np

from recommendation import generate_recommendation

model = joblib.load("model.pkl")


def predict_machine(features):

    arr = np.array(features).reshape(1, -1)

    prediction = model.predict(arr)[0]

    confidence = max(model.predict_proba(arr)[0]) * 100

    result = generate_recommendation(
        prediction,
        confidence,
        features[1],  # Air Temp
        features[2],  # Process Temp
        features[4],  # Torque
        features[5],  # Tool Wear
    )

    return {
        "machine_status": "Healthy" if prediction == 0 else "Failure Detected",
        "confidence": round(confidence, 2),
        **result,
    }