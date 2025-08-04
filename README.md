===============================
Supply Chain Emission Factors Prediction
===============================

Project Description:
--------------------
This project aims to predict Supply Chain Emission Factors with Margins using machine learning techniques. The model is trained on commodity and industry-related data, including features such as substance type, unit, and industry code. The objective is to support accurate estimation of emissions for sustainability reporting and environmental impact analysis.

Methodology:
------------
1. Data loaded from Google Drive using pandas
2. Data cleaning: Dropped unnecessary or empty columns
3. Exploratory Data Analysis (EDA) using seaborn and matplotlib
4. Feature Engineering: Mapped categorical values (Substance, Unit) to numeric values
5. Feature Scaling: Applied StandardScaler to normalize input features
6. Train-Test Split: Divided data into 80% training and 20% testing sets
7. Model Training: Used RandomForestRegressor
8. Model Evaluation: RMSE and R² Score were calculated
9. Hyperparameter Tuning: GridSearchCV used to find optimal parameters
10. Model Saving: Saved the best model and scaler using joblib

Dataset:
--------
- Filename: supplyfiles.csv
- Path: /content/drive/MyDrive/Colab Notebooks/supplyfiles.csv
- Features: Industry Code, Commodity, Substance, Unit, Emission Factor, etc.
- Target: Supply Chain Emission Factors with Margins

How to Run:
-----------
1. Open the project in Google Colab or Jupyter Notebook
2. Mount Google Drive (for Colab users)
3. Ensure that the file path to the dataset is correct
4. Run all the code cells in order
5. The model and scaler will be saved in a 'models' directory

Dependencies:
-------------
- pandas
- numpy
- matplotlib
- seaborn
- scikit-learn
- joblib

Model Performance:
------------------
- RMSE: [Insert your RMSE value here]
- R² Score: [Insert your R² value here]
- Best Parameters (GridSearchCV): [Insert best_params_ here]

Output Files:
-------------
- models/final_model.pkl – The trained Random Forest model
- models/scaler.pkl – The scaler used for feature normalization

Future Improvements:
--------------------
- Deploy the model as a web application or REST API
- Incorporate time-series emissions data
- Use more granular regional data for improved accuracy
