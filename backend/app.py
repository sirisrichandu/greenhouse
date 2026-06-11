
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import joblib
import numpy as np

app = Flask(__name__)

CORS(app)
# MongoDB Connection client
mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client["greenhouse_db"] 
collection = db["predictions"]

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

            "suggestion": suggestion
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

                "low_percentage": 0
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

        return jsonify({

            "total": total_predictions,

            "average": avg_prediction,

            "low_percentage": low_percentage
        })

    except Exception as e:

        return jsonify({

            "error": str(e)
        })



if __name__ == "__main__":

    app.run(debug=True)

