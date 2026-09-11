# 🚀 MachineGuard AI – AI Predictive Machine Maintenance System

> An AI-powered predictive maintenance dashboard designed to monitor industrial machine health, predict potential failures, and provide maintenance recommendations.

---

## 📌 Overview

**MachineGuard AI** is an AI-based predictive maintenance system that helps monitor industrial machine conditions and identify the possibility of machine failure before it occurs.

The system takes important machine parameters such as temperature, rotational speed, torque, and tool wear as input and uses a **Random Forest Machine Learning model** to generate a failure prediction.

The results are presented through an interactive dashboard containing machine health information, failure probability, prediction confidence, risk level, analytics, and maintenance recommendations.

---

## ✨ Features

### 🤖 AI Prediction Engine

* Machine failure prediction using Machine Learning
* Random Forest Classifier
* Failure probability calculation
* Prediction confidence
* Machine health score
* Risk assessment

### 📊 Interactive Dashboard

* Industrial-style dashboard
* Real-time prediction cards
* Machine health gauge
* Risk meter
* Prediction overview
* Prediction history

### 📈 Analytics

* Feature importance visualization
* Failure trend analysis
* Sensor health monitoring
* Model information
* Prediction probability

### ⚡ Live Simulation

* Simulated industrial machine scenarios
* Healthy machine scenario
* Wear fault scenario
* Thermal fault scenario
* Over-torque scenario

### 📄 Reports

* Prediction report
* Maintenance recommendation report
* Diagnostic summary

---

# 🧠 Machine Learning Model

| Property        | Details                                  |
| --------------- | ---------------------------------------- |
| Algorithm       | Random Forest Classifier                 |
| Accuracy        | 98.4%                                    |
| Dataset         | AI4I 2020 Predictive Maintenance Dataset |
| Framework       | Scikit-Learn                             |
| Data Processing | Pandas, NumPy                            |
| Model Storage   | Joblib                                   |

The trained model is stored in the backend and loaded when the application starts.

---

# 🏗 System Architecture

```text
                    ┌──────────────────────┐
                    │   Machine Parameters │
                    │                      │
                    │ • Machine Type       │
                    │ • Air Temperature    │
                    │ • Process Temperature│
                    │ • Rotational Speed   │
                    │ • Torque             │
                    │ • Tool Wear          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │      Dashboard       │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Flask Backend    │
                    │                      │
                    │   /predict           │
                    │   /health            │
                    │   /stats             │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Random Forest Model │
                    │                      │
                    │   Failure Prediction │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Prediction Results   │
                    │                      │
                    │ • Failure Probability│
                    │ • Confidence         │
                    │ • Health Score       │
                    │ • Risk Level         │
                    │ • Recommendation     │
                    └──────────────────────┘
```

---

# 🛠 Technology Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Chart.js
* React ChartJS 2
* Lucide React

## Backend

* Python
* Flask
* Flask-CORS
* Gunicorn

## Machine Learning

* Scikit-Learn
* Random Forest
* Pandas
* NumPy
* Joblib

## Deployment

* Vercel
* Render
* GitHub

---

# 📂 Project Structure

MachineGuard-AI/
│
├── backend/
│   ├── dataset/
│   │   └── ai4i2020.csv
│   │
│   ├── .gitignore
│   ├── app.py
│   ├── confusion_matrix.png
│   ├── encoder.pkl
│   ├── feature_importance.png
│   ├── feature_names.pkl
│   ├── model.pkl
│   ├── predict.py
│   ├── recommendation.py
│   ├── requirements.txt
│   └── train_model.py
│
├── frontend/
│   ├── public/
│   │   └── Logo.png
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   │   ├── FailureChart.jsx
│   │   │   │   ├── FeatureChart.jsx
│   │   │   │   ├── ModelInfo.jsx
│   │   │   │   └── SensorHealthStatus.jsx
│   │   │   │
│   │   │   ├── prediction/
│   │   │   │   ├── ConfidenceCard.jsx
│   │   │   │   ├── HealthGauge.jsx
│   │   │   │   ├── PredictionOverview.jsx
│   │   │   │   ├── PredictionStatus.jsx
│   │   │   │   ├── ProbabilityCard.jsx
│   │   │   │   ├── RecommendationCard.jsx
│   │   │   │   └── RiskCard.jsx
│   │   │   │
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── Screenshots/
│   ├── Dashboard.png
│   ├── Control Panel.png
│   ├── Machine Telemetry.png
│   ├── Download Report.png
│   └── Timelog.png
│
├── .gitignore
└── README.md

---

# 📊 Dataset

MachineGuard AI uses the **AI4I 2020 Predictive Maintenance Dataset**.

The dataset contains industrial machine information and operating parameters that can be used to predict machine failures.

### Important Parameters

* Machine Type
* Air Temperature
* Process Temperature
* Rotational Speed
* Torque
* Tool Wear

These parameters are processed before being passed to the trained Machine Learning model.

---

# 🏭 Machine Parameters

| Parameter           | Description                          |
| ------------------- | ------------------------------------ |
| Machine Type        | Type/category of the machine         |
| Air Temperature     | Temperature of the surrounding air   |
| Process Temperature | Temperature during machine operation |
| Rotational Speed    | Machine rotational speed             |
| Torque              | Torque generated by the machine      |
| Tool Wear           | Amount of tool usage/wear            |

These values help the model determine the operating condition of the machine.

---

# 🔄 How It Works


1. User enters machine parameters
              ↓
2. Frontend sends data to Flask API
              ↓
3. Backend validates and processes the input
              ↓
4. Trained Random Forest model receives the data
              ↓
5. Model predicts machine failure probability
              ↓
6. Backend generates prediction information
              ↓
7. Frontend displays the results
              ↓
8. Dashboard provides health and maintenance insights


---

# 📡 API Endpoints

## GET `/health`

Checks whether the backend service is running.

### Response


{
  "status": "healthy"
}


---

## GET `/stats`

Returns model and dashboard statistics used by the frontend.

---

## POST `/predict`

Accepts machine parameters and returns a machine failure prediction.

### Example Input

```json
{
  "type": "M",
  "air_temperature": 300,
  "process_temperature": 310,
  "rotational_speed": 1500,
  "torque": 40,
  "tool_wear": 100
}
```

The response contains prediction-related information used to populate the dashboard.

---

# 🚀 Installation

## 1. Clone the Repository


git clone <github.com/AgarwalSaksham19/MachineGuard-AI>
cd MachineGuard-AI


---

## 2. Setup Backend

Open a terminal:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask backend:

```bash
python app.py
```

The backend will run on:

```text
http://127.0.0.1:5000
```

---

## 3. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

---

# 📷 Dashboard

The dashboard provides a centralized view of machine health and prediction information.

It includes:

* Machine prediction status
* Failure probability
* Prediction confidence
* Health score
* Risk level
* Machine health gauge
* Feature importance
* Failure trends
* Sensor health
* Maintenance recommendations
* Prediction history
* Model information

---

# 🏭 Use Cases

MachineGuard AI can be used for:

* Industrial machine monitoring
* Predictive maintenance
* Equipment health assessment
* Early failure detection
* Maintenance planning
* Machine condition analysis
* Demonstration of ML-based industrial systems

---

# 💡 Future Improvements

* 🔐 User authentication
* ☁️ Cloud database integration
* 📡 IoT sensor integration
* 📶 MQTT-based sensor streaming
* 📧 Email and SMS maintenance alerts
* ⏳ Remaining Useful Life (RUL) prediction
* 🧠 LSTM-based time-series prediction
* 🏭 Multi-machine fleet monitoring
* 📊 Advanced historical analytics

---

# 📌 Project Status

**Status: Completed**

The current version provides an end-to-end predictive maintenance dashboard with:

* Machine Learning prediction
* Flask REST API
* React frontend
* Interactive analytics
* Machine health monitoring
* Maintenance recommendations
* Simulation scenarios

---

# 👨‍💻 Author

**Saksham Agarwal**

B.Tech – Computer Science & Engineering
DIT University, Dehradun

---

# 📜 License & Attribution

This project is intended for educational and portfolio purposes.

# ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---
