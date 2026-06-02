
from flask import Flask, render_template, request
import joblib
import numpy as np

app = Flask(__name__)

# Load ML model and scaler
model = joblib.load("model/emission_model.pkl")
scaler = joblib.load("model/scaler.pkl")


@app.route("/", methods=["GET", "POST"])
def home():

    prediction = None
    status = ""
    suggestion = ""
    progress_class = ""

    if request.method == "POST":

        try:

            # Form Inputs

            industry = float(request.form["industry"])

            substance = float(request.form["substance"])

            unit = float(request.form["unit"])

            base = float(request.form["base_emission"])

            margin = float(request.form["margin"])

            dq_reliability = float(request.form["dq_reliability"])

            dq_temporal = float(request.form["dq_temporal"])

            dq_geo = float(request.form["dq_geo"])

            dq_tech = float(request.form["dq_tech"])

            dq_data = float(request.form["dq_data"])

            # Feature array
            # Industry not included because
            # trained model expects 9 features

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

            # Scale features

            features_scaled = scaler.transform(features)

            # Predict emission

            prediction = round(model.predict(features_scaled)[0], 4)

            # Emission Logic

            if prediction < 1:

                status = "🟢 Low Emission"

                progress_class = "progress-low"

                suggestion = (
                    "This industry shows relatively low greenhouse gas emissions. "
                    "Current sustainability practices appear effective."
                )

            elif prediction < 3:

                status = "🟡 Medium Emission"

                progress_class = "progress-medium"

                suggestion = (
                    "Moderate emissions detected. "
                    "Consider improving operational efficiency and energy efficiency."
                )

            else:

                status = "🔴 High Emission"

                progress_class = "progress-high"

                suggestion = (
                    "High greenhouse gas emissions detected. "
                    "Consider renewable energy adoption, cleaner technologies, "
                    "and supply chain optimization."
                )

        except Exception as e:

            prediction = f"Error: {str(e)}"

    return render_template(
        "index.html",
        prediction=prediction,
        status=status,
        suggestion=suggestion,
        progress_class=progress_class
    )


if __name__ == "__main__":
    app.run(debug=True)

