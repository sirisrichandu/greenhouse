# 🌍 EcoAI Emission Dashboard

A full-stack AI-powered sustainability analytics platform that predicts greenhouse gas emissions using Machine Learning and visualizes environmental impact through interactive dashboards.

---

# 🚀 Project Overview

EcoAI Dashboard is a modern sustainability monitoring system designed to analyze and predict greenhouse gas emissions across industries.

The platform combines:

* ⚛️ React frontend for interactive UI
* 🐍 Flask backend API
* 🧠 Machine Learning prediction model
* 🍃 MongoDB Atlas database
* 📊 Real-time analytics charts

This project demonstrates full-stack development, API integration, data visualization, and AI-based prediction systems.

---

# 🏗 Architecture

```text id="arch1"
React Frontend
      ↓
Axios API Requests
      ↓
Flask Backend
      ↓
Machine Learning Model
      ↓
MongoDB Atlas Database
```

---

# ✨ Features

## Frontend (React)

* Modern responsive dashboard UI
* Dark / Light theme toggle
* Interactive emission prediction form
* Sustainability score visualization
* Dynamic progress indicators
* Prediction history section
* Analytics charts using Chart.js
* Responsive mobile-friendly design

---

## Backend (Flask)

* REST API development
* Emission prediction endpoint
* Prediction history endpoint
* Statistics endpoint
* MongoDB integration
* Machine Learning model serving

---

## Machine Learning

* Scikit-learn regression model
* Emission prediction system
* Feature scaling using StandardScaler
* Sustainability analytics processing

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Axios
* Chart.js
* CSS3

---

## Backend

* Flask
* Flask-CORS
* Python

---

## Machine Learning

* Scikit-learn
* NumPy
* Joblib

---

## Database

* MongoDB Atlas

---

# 📂 Project Structure

```text id="struct1"
backend/
│
├── app.py
├── model/
│   ├── emission_model.pkl
│   └── scaler.pkl
│
└── .env


sustainable-frontend/
│
├── src/
│   ├── components/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash id="inst1"
git clone <your-github-repository-url>
```

---

# Backend Setup

```bash id="inst2"
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```text id="inst3"
http://127.0.0.1:5000
```

---

# Frontend Setup

```bash id="inst4"
cd sustainable-frontend

npm install

npm run dev
```

Frontend runs on:

```text id="inst5"
http://localhost:5173
```

---

# 🔐 Environment Variables

Create `.env` file inside backend folder:

```env id="env1"
MONGO_URI=your_mongodb_connection_string
```

---

# 📊 Dashboard Modules

* Emission Prediction Dashboard
* Sustainability Score Analysis
* Prediction History Tracking
* Emission Trend Analytics
* Emission Category Visualization

---

# 🌱 Future Improvements

* User Authentication
* PDF Report Generation
* Live Sustainability Monitoring
* Cloud Deployment
* Advanced ML Models

---

# 👨‍💻 Developed By

Siri Sri

---

# 📜 License

Developed for educational and sustainability research purposes.
