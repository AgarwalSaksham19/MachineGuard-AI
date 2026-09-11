from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from datetime import datetime
from recommendation import generate_recommendation

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")

# Keep feature names in order
FEATURE_NAMES = [
    "Type",
    "Air temperature [K]",
    "Process temperature [K]",
    "Rotational speed [rpm]",
    "Torque [Nm]",
    "Tool wear [min]"
]

@app.route("/")
def home():
    return jsonify({
        "message": "MachinePulse Backend Running Successfully!",
        "status": "Online"
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # Parse and order features
        features = np.array([[
            float(data["Type"]),
            float(data["Air temperature [K]"]),
            float(data["Process temperature [K]"]),
            float(data["Rotational speed [rpm]"]),
            float(data["Torque [Nm]"]),
            float(data["Tool wear [min]"])
        ]])

        prediction = int(model.predict(features)[0])
        probability = model.predict_proba(features)[0]
        confidence = round(float(max(probability)) * 100, 2)

        # Dynamic Recommendation calculation
        rec_result = generate_recommendation(
            prediction=prediction,
            confidence=confidence,
            air_temp=float(data["Air temperature [K]"]),
            process_temp=float(data["Process temperature [K]"]),
            torque=float(data["Torque [Nm]"]),
            tool_wear=float(data["Tool wear [min]"])
        )

        health_score = rec_result["health_score"]
        risk_level = rec_result["risk_level"]
        recommendations = rec_result["recommendations"]
        timestamp = rec_result["timestamp"]

        # Health / Failure logic
        if prediction == 0:
            machine_status = "Healthy"
            remaining_life = "180 Hours" if health_score >= 90 else ("120 Hours" if health_score >= 70 else "80 Hours")
            next_inspection = "35 Operating Hours" if health_score >= 90 else "10 Operating Hours"
        else:
            machine_status = "Failure"
            remaining_life = "20 Hours" if risk_level == "High" else "5 Hours"
            next_inspection = "Immediately"

        response = {
            "machine_status": machine_status,
            "confidence": confidence,
            "health_score": health_score,
            "risk_level": risk_level,
            "recommendations": recommendations,
            "timestamp": timestamp,
            "remaining_life": remaining_life,
            "next_inspection": next_inspection,
            "maintenance_priority": risk_level,
            "prediction_probability": {
                "healthy": round(float(probability[0]) * 100, 2),
                "failure": round(float(probability[1]) * 100, 2)
            },
            "feature_importance": dict(zip(FEATURE_NAMES, [round(float(val) * 100, 2) for val in model.feature_importances_]))
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})

@app.route("/stats", methods=["GET"])
def stats():
    # Calculate feature importances dynamically from loaded model
    importances = dict(zip(FEATURE_NAMES, [round(float(val) * 100, 2) for val in model.feature_importances_]))
    
    return jsonify({
        "accuracy": 98.4,
        "healthy": 9654,
        "maintenance": 231,
        "critical": 65,
        "dataset_size": 10000,
        "training_samples": 8000,
        "testing_samples": 2000,
        "model": "Random Forest",
        "dataset": "AI4I 2020 Predictive Maintenance Dataset",
        "version": "1.0",
        "feature_importance": importances
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)