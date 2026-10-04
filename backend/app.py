from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")


# =========================================================
# LOAD PRICE MODEL
# =========================================================

PRICE_MODEL_PATH = os.path.join(
    MODELS_DIR,
    "best_vehicle_price_model.pkl"
)

with open(PRICE_MODEL_PATH, "rb") as file:
    price_model = pickle.load(file)

print("Vehicle price model loaded successfully!")


# =========================================================
# LOAD FRAUD MODEL
# =========================================================

FRAUD_MODEL_PATH = os.path.join(
    MODELS_DIR,
    "vehicle_fraud_detection_system_new.pkl"
)

with open(FRAUD_MODEL_PATH, "rb") as file:
    fraud_model = pickle.load(file)

print("Vehicle fraud model loaded successfully!")


# =========================================================
# LOAD RECOMMENDATION MODEL
# =========================================================

RECOMMENDATION_MODEL_PATH = os.path.join(
    MODELS_DIR,
    "vehicle_recommendation_system_new.pkl"
)

with open(RECOMMENDATION_MODEL_PATH, "rb") as file:
    recommendation_data = pickle.load(file)

recommendation_features = recommendation_data["features"]
recommendation_scaler = recommendation_data["scaler"]
recommendation_similarity = recommendation_data["similarity_matrix"]
recommendation_df = recommendation_data["recommendation_df"]

print("Vehicle recommendation model loaded successfully!")


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return jsonify({
        "message": "CARVANTA Backend is running"
    })


# =========================================================
# STATUS
# =========================================================

@app.route("/api/status")
def status():
    return jsonify({
        "status": "Backend connected successfully"
    })


# =========================================================
# PRICE PREDICTION
# =========================================================

@app.route("/api/predict", methods=["POST"])
def predict():

    data = request.get_json()

    print("Received vehicle data:")
    print(data)

    try:

        engine = float(data.get("engine", 0))
        mileage = float(data.get("mileage", 0))

        wheel_base = 98.0
        length = 175.0
        width = 65.0
        curb_weight = 2500.0
        engine_size = engine
        bore = 3.2
        horsepower = 100.0
        city_mpg = 25.0
        highway_mpg = 30.0

        power_to_weight = horsepower / curb_weight
        fuel_efficiency = (city_mpg + highway_mpg) / 2
        engine_size_per_weight = engine_size / curb_weight

        features = [[
            wheel_base,
            length,
            width,
            curb_weight,
            engine_size,
            bore,
            horsepower,
            city_mpg,
            highway_mpg,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            1,
            power_to_weight,
            fuel_efficiency,
            engine_size_per_weight
        ]]

        prediction = price_model.predict(features)[0]

        return jsonify({
            "predicted_price": round(float(prediction)),
            "message": "Prediction successful"
        })

    except Exception as e:

        print("Prediction error:", str(e))

        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


# =========================================================
# EMI
# =========================================================

@app.route("/api/emi", methods=["POST"])
def emi():

    data = request.get_json()

    try:

        price = float(data.get("price", 0))
        down_payment = float(data.get("down_payment", 0))
        interest = float(data.get("interest", 0))
        tenure = float(data.get("tenure", 0))

        principal = price - down_payment
        monthly_rate = interest / 12 / 100
        months = tenure * 12

        if principal <= 0 or monthly_rate <= 0 or months <= 0:
            return jsonify({
                "error": "Invalid EMI details"
            }), 400

        monthly_emi = (
            principal
            * monthly_rate
            * (1 + monthly_rate) ** months
            / ((1 + monthly_rate) ** months - 1)
        )

        total_amount = monthly_emi * months
        total_interest = total_amount - principal

        return jsonify({
            "emi": round(monthly_emi),
            "total_interest": round(total_interest),
            "total_amount": round(total_amount)
        })

    except Exception as e:

        return jsonify({
            "error": "EMI calculation failed",
            "details": str(e)
        }), 500


# =========================================================
# MAINTENANCE
# =========================================================

@app.route("/api/maintenance", methods=["POST"])
def maintenance():

    data = request.get_json()

    try:

        age = float(data.get("age", 0))
        mileage = float(data.get("mileage", 0))
        usage = data.get("usage", "")

        if age <= 3:
            cost = 15000
        elif age <= 7:
            cost = 25000
        else:
            cost = 40000

        if mileage > 100000:
            cost += 10000
        elif mileage > 50000:
            cost += 5000

        if usage == "High":
            cost += 7500
        elif usage == "Low":
            cost -= 3000

        cost = max(cost, 10000)

        return jsonify({
            "estimated_cost": cost,
            "message": "Maintenance estimate generated"
        })

    except Exception as e:

        return jsonify({
            "error": "Maintenance estimation failed",
            "details": str(e)
        }), 500


# =========================================================
# FRAUD DETECTION
# =========================================================

@app.route("/api/fraud-check", methods=["POST"])
def fraud_check():

    data = request.get_json()

    print("Fraud check data:")
    print(data)

    try:

        price = float(data.get("price", 0))
        year = float(data.get("year", 0))
        mileage = float(data.get("mileage", 0))

        # Values matching the fraud model's trained features
        engine_size = float(data.get("engine_size", 120))
        horsepower = float(data.get("horsepower", 100))
        curb_weight = float(data.get("curb_weight", 2500))
        city_mpg = float(data.get("city_mpg", 25))
        highway_mpg = float(data.get("highway_mpg", 30))
        wheel_base = float(data.get("wheel_base", 98))
        length = float(data.get("length", 175))
        width = float(data.get("width", 65))
        height = float(data.get("height", 55))

        features = np.array([[
            price,
            engine_size,
            horsepower,
            curb_weight,
            city_mpg,
            highway_mpg,
            wheel_base,
            length,
            width,
            height
        ]])

        model = fraud_model["fraud_model"]
        scaler = fraud_model["fraud_scaler"]

        scaled_features = scaler.transform(features)

        prediction = model.predict(scaled_features)[0]
        anomaly_score = model.decision_function(scaled_features)[0]

        if prediction == -1:
            risk = "HIGH RISK"
            message = "Suspicious vehicle indicators detected."
        else:
            risk = "LOW RISK"
            message = "No major suspicious indicators detected."

        return jsonify({
            "risk": risk,
            "message": message,
            "anomaly_score": round(float(anomaly_score), 4)
        })

    except Exception as e:

        print("Fraud detection error:", str(e))

        return jsonify({
            "error": "Fraud detection failed",
            "details": str(e)
        }), 500


# =========================================================
# RECOMMENDATION SYSTEM
# =========================================================

@app.route("/api/recommend", methods=["POST"])
def recommend():

    data = request.get_json()

    print("Recommendation request:")
    print(data)

    try:

        # Get recommendation inputs
        vehicle_values = []

        for feature in recommendation_features:

            value = float(data.get(feature, 0))
            vehicle_values.append(value)

        vehicle_array = np.array([vehicle_values])

        # Scale user vehicle
        scaled_vehicle = recommendation_scaler.transform(
            vehicle_array
        )

        # Calculate similarity with dataset
        similarities = cosine_similarity(
            scaled_vehicle,
            recommendation_scaler.transform(
                recommendation_df[recommendation_features]
            )
        )[0]

        # Get top 5 recommendations
        top_indices = similarities.argsort()[-5:][::-1]

        recommendations = []

        for index in top_indices:

            vehicle = recommendation_df.iloc[index]

            recommendations.append({
                "make": str(vehicle["make"]),
                "engine_size": float(vehicle["engine-size"]),
                "horsepower": float(vehicle["horsepower"]),
                "curb_weight": float(vehicle["curb-weight"]),
                "city_mpg": float(vehicle["city-mpg"]),
                "highway_mpg": float(vehicle["highway-mpg"]),
                "similarity": round(
                    float(similarities[index]),
                    4
                )
            })

        return jsonify({
            "recommendations": recommendations,
            "message": "Vehicle recommendations generated successfully"
        })

    except Exception as e:

        print("Recommendation error:", str(e))

        return jsonify({
            "error": "Recommendation failed",
            "details": str(e)
        }), 500


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )