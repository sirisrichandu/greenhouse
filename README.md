# 🌍 Supply Chain Emission Factor Prediction

## 📌 Project Overview
This project is a Machine Learning–based web application that predicts **Supply Chain Greenhouse Gas (GHG) Emission Factors** using industry-specific data.  
The system helps estimate emission intensity based on substance type, emission margins, and data quality indicators.

The model is integrated with a **Flask-based frontend**, allowing users to input parameters and get real-time emission predictions.

---

## 🎯 Objectives
- To analyze supply chain emission data
- To build a regression model for emission factor prediction
- To deploy the trained model using a web interface
- To support environmental impact assessment and sustainability analysis

---

## 📊 Dataset Description
- Source: **Official Supply Chain Emission Factors dataset (EPA-based)**
- Format: CSV
- Records: 264
- Features include:
  - Commodity Code & Name
  - Substance (CO₂, CH₄, N₂O, Other GHGs)
  - Emission Factors (with and without margins)
  - Data Quality (DQ) indicators

**Target Variable:**  
`Supply Chain Emission Factors with Margins`

---

## 🧠 Machine Learning Model
- Model Used: **Random Forest Regressor**
- Reason for selection:
  - Handles non-linear relationships
  - Robust to noise
  - High accuracy for tabular data

**Evaluation Metrics:**
- RMSE (Root Mean Square Error)
- R² Score

---

## 🛠️ Tech Stack Used

### Backend & ML
- Python
- Pandas, NumPy
- Scikit-learn
- Joblib

### Frontend
- HTML
- CSS

### Web Framework
- Flask

### Tools
- Google Colab (model training)
- VS Code
- Git & GitHub

---

## 🖥️ Application Workflow
1. User enters emission-related parameters in the frontend
2. Inputs are sent to Flask backend
3. Data is scaled using the saved StandardScaler
4. Trained Random Forest model predicts emission factor
5. Result is displayed on the web page

---

