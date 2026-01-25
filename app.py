from flask import Flask, render_template, request
import joblib
import numpy as np

app = Flask(__name__)

# Load model & scaler
model = joblib.load("model/emission_model.pkl")
scaler = joblib.load("model/scaler.pkl")

@app.route("/", methods=["GET", "POST"])
def home():
    prediction = None

    if request.method == "POST":
        substance = int(request.form["substance"])
        unit = int(request.form["unit"])
        base = float(request.form["base"])
        margin = float(request.form["margin"])
        dq1 = int(request.form["dq1"])
        dq2 = int(request.form["dq2"])
        dq3 = int(request.form["dq3"])
        dq4 = int(request.form["dq4"])
        dq5 = int(request.form["dq5"])

        features = np.array([[substance, unit, base, margin, dq1, dq2, dq3, dq4, dq5]])
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]

    return render_template("index.html", prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True)