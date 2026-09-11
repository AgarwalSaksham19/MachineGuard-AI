from datetime import datetime


def generate_recommendation(prediction, confidence, air_temp, process_temp, torque, tool_wear):

    score = 100
    recommendations = []

    # Tool Wear
    if tool_wear > 200:
        score -= 35
        recommendations.append("Replace cutting tool immediately.")
    elif tool_wear > 150:
        score -= 20
        recommendations.append("Inspect cutting tool for excessive wear.")
    elif tool_wear > 100:
        score -= 10

    # Torque
    if torque > 60:
        score -= 20
        recommendations.append("Inspect spindle bearings and lubrication.")
    elif torque > 50:
        score -= 10

    # Temperature Difference
    temp_diff = process_temp - air_temp

    if temp_diff > 12:
        score -= 10
        recommendations.append("Check machine cooling system.")

    # ML Prediction
    if prediction == 1:
        score -= 30

    score = max(0, min(score, 100))

    # Risk Level
    if score >= 90:
        risk = "Low"
    elif score >= 70:
        risk = "Moderate"
    elif score >= 40:
        risk = "High"
    else:
        risk = "Critical"

    if len(recommendations) == 0:
        recommendations.append(
            "Machine is operating normally. Continue scheduled maintenance."
        )

    return {
        "health_score": score,
        "risk_level": risk,
        "recommendations": recommendations,
        "timestamp": datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    }