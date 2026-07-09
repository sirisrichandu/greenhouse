import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
import joblib
import numpy as np
from flask_bcrypt import Bcrypt

from flask_jwt_extended import JWTManager, create_access_token 

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "greenhouse_secret_key_2026"

bcrypt = Bcrypt(app)

jwt = JWTManager(app)
# MongoDB Connection client
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client["greenhouse_db"] 
collection = db["predictions"]
users_collection = db["users"]

# LOAD MODEL

model = joblib.load("model/emission_model.pkl")

scaler = joblib.load("model/scaler.pkl")



@app.route("/predict", methods=["POST"])

def predict():

    try:

        data = request.json

        # INPUTS

        industry = data["industry"]

        substance = float(data["substance"])

        unit = float(data["unit"])

        base = float(data["base_emission"])

        margin = float(data["margin"])

        dq_reliability = float(data["dq_reliability"])

        dq_temporal = float(data["dq_temporal"])

        dq_geo = float(data["dq_geo"])

        dq_tech = float(data["dq_tech"])

        dq_data = float(data["dq_data"])

        # FEATURE ARRAY

        features = np.array([[
            substance,
            unit,
            base,
            margin,
            dq_reliability,
            dq_temporal,
            dq_geo,
            dq_tech,
            dq_data
        ]])

        # SCALE FEATURES

        features_scaled = scaler.transform(features)

        # PREDICT

        prediction = round(
            model.predict(features_scaled)[0],
            4
        )

        # STATUS

        if prediction < 1:

            status = "🟢 Low Emission"

            suggestion = (
                "Low greenhouse gas emissions detected."
            )

        elif prediction < 3:

            status = "🟡 Medium Emission"

            suggestion = (
                "Moderate emissions detected."
            )

        else:

            status = "🔴 High Emission"

            suggestion = (
                "High emissions detected."
            )

        # SAVE TO MONGODB

        prediction_data = {

    "industry": industry,

    "substance": substance,

    "prediction": prediction,

    "status": status,

    "suggestion": suggestion,

    "time": datetime.now().strftime(
        "%d %b %Y, %I:%M %p"
    )
}

        collection.insert_one(prediction_data)

        # RETURN RESPONSE

        return jsonify({

            "prediction": prediction,

            "status": status,

            "suggestion": suggestion
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })
    T

@app.route("/upload-csv", methods=["POST"])

def upload_csv():

    try:

        file = request.files["file"]

        df = pd.read_csv(file)




        # ENCODE TEXT VALUES

        substance_map = {

            "carbon dioxide": 0,

            "methane": 1,

            "nitrous oxide": 2,

            "other GHGs": 3
        }




        unit_map = {

            "kg CO2e/2018 USD, purchaser price": 0,

            "kg/2018 USD, purchaser price": 1
        }




        df["Substance"] = df["Substance"].map(
            substance_map
        )




        df["Unit"] = df["Unit"].map(
            unit_map
        )




        features = df[[

            "Substance",

            "Unit",

            "Supply Chain Emission Factors without Margins",

            "Margins of Supply Chain Emission Factors",

            "DQ ReliabilityScore of Factors without Margins",

            "DQ TemporalCorrelation of Factors without Margins",

            "DQ GeographicalCorrelation of Factors without Margins",

            "DQ TechnologicalCorrelation of Factors without Margins",

            "DQ DataCollection of Factors without Margins"

        ]]




        features_scaled = scaler.transform(
            features
        )




        predictions = model.predict(
            features_scaled
        )




        df["prediction"] = predictions




        
        results = df[[

    "Commodity Name",

    "Substance",

    "Supply Chain Emission Factors without Margins",

    "prediction"

]].rename(columns={

    "Supply Chain Emission Factors without Margins":
    "base_emission"

}).to_dict(
    orient="records"
)  




        return jsonify(results)




    except Exception as e:

        return jsonify({

            "error": str(e)
        })   



        

@app.route("/history", methods=["GET"])

def history():

    try:

        predictions = list(
            collection.find({}, {"_id": 0})
        )

        return jsonify(predictions)

    except Exception as e:

        return jsonify({
            "error": str(e)
        })

@app.route("/stats", methods=["GET"])

def stats():

    try:

        predictions = list(
            collection.find({}, {"_id": 0})
        )

        total_predictions = len(predictions)




        if total_predictions == 0:

            return jsonify({

                "total": 0,

                "average": 0,

                "low_percentage": 0,

                "highest_prediction": 0,

                "latest_prediction": 0
            })




        # AVERAGE PREDICTION

        avg_prediction = round(

            sum(
                item["prediction"]
                for item in predictions
            ) / total_predictions,

            2
        )




        # LOW EMISSION %

        low_count = sum(

            1

            for item in predictions

            if item["prediction"] < 1
        )




        low_percentage = round(

            (low_count / total_predictions) * 100,

            1
        )




        # HIGHEST PREDICTION

        highest_prediction = max(

            item["prediction"]

            for item in predictions
        )




        # LATEST PREDICTION

        latest_prediction = predictions[-1]["prediction"]




        return jsonify({

            "total": total_predictions,

            "average": avg_prediction,

            "low_percentage": low_percentage,

            "highest_prediction": highest_prediction,

            "latest_prediction": latest_prediction
        })




    except Exception as e:

        return jsonify({

            "error": str(e)
        })

@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.json

        name = data["name"].strip()
        email = data["email"].strip().lower()
        password = data["password"]

        # Check existing user
        existing_user = users_collection.find_one({
            "email": email
        })

        if existing_user:

            return jsonify({
                "message": "Email already exists"
            }), 400

        # Hash password
        hashed_password = bcrypt.generate_password_hash(
            password
        ).decode("utf-8")

        # Save user
        users_collection.insert_one({

            "name": name,
            "email": email,
            "password": hashed_password

        })

        return jsonify({

            "message": "User registered successfully"

        }), 201

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500  
@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.json

        email = data["email"].strip().lower()
        password = data["password"]

        # Find user

        user = users_collection.find_one({

            "email": email

        })

        if not user:

            return jsonify({

                "message": "Invalid email or password"

            }), 401

        # Verify password

        if not bcrypt.check_password_hash(

            user["password"],
            password

        ):

            return jsonify({

                "message": "Invalid email or password"

            }), 401

        # Generate JWT token

        access_token = create_access_token(

            identity=email

        )

        return jsonify({

            "message": "Login successful",

            "token": access_token,

            "name": user["name"]

        }), 200

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500

if __name__ == "__main__":

    app.run(debug=True)

