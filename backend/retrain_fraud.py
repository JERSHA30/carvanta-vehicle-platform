import os
import pickle
import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest


# =========================
# PATHS
# =========================

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATA_PATH = os.path.join(
    BASE_DIR,
    "automobile_dataset.csv"
)

OUTPUT_PATH = os.path.join(
    BASE_DIR,
    "models",
    "vehicle_fraud_detection_system_new.pkl"
)


# =========================
# LOAD DATASET
# =========================

print("Loading dataset...")

columns = [
    "symboling",
    "normalized-losses",
    "make",
    "fuel-type",
    "aspiration",
    "num-of-doors",
    "body-style",
    "drive-wheels",
    "engine-location",
    "wheel-base",
    "length",
    "width",
    "height",
    "curb-weight",
    "engine-type",
    "num-of-cylinders",
    "engine-size",
    "fuel-system",
    "bore",
    "stroke",
    "compression-ratio",
    "horsepower",
    "peak-rpm",
    "city-mpg",
    "highway-mpg",
    "price"
]

df = pd.read_csv(
    DATA_PATH,
    names=columns,
    na_values="?"
)

print("Dataset loaded:", df.shape)


# =========================
# CONVERT NUMERIC COLUMNS
# =========================

numeric_columns = [
    "wheel-base",
    "length",
    "width",
    "height",
    "curb-weight",
    "engine-size",
    "bore",
    "stroke",
    "compression-ratio",
    "horsepower",
    "peak-rpm",
    "city-mpg",
    "highway-mpg",
    "price"
]

for col in numeric_columns:
    df[col] = pd.to_numeric(df[col], errors="coerce")


# =========================
# FRAUD FEATURES
# =========================

fraud_features = [
    "price",
    "engine-size",
    "horsepower",
    "curb-weight",
    "city-mpg",
    "highway-mpg",
    "wheel-base",
    "length",
    "width",
    "height"
]

fraud_df = df[fraud_features].copy()

# Remove rows with missing fraud values
fraud_df = fraud_df.dropna().reset_index(drop=True)

print("Fraud data:", fraud_df.shape)


# =========================
# SCALER
# =========================

fraud_scaler = StandardScaler()

fraud_scaled = fraud_scaler.fit_transform(
    fraud_df[fraud_features]
)


# =========================
# ISOLATION FOREST
# =========================

fraud_model = IsolationForest(
    n_estimators=300,
    contamination=0.05,
    random_state=42
)

fraud_model.fit(fraud_scaled)


# =========================
# RISK SCORE
# =========================

fraud_predictions = fraud_model.predict(fraud_scaled)

fraud_scores = fraud_model.decision_function(
    fraud_scaled
)

score_min = fraud_scores.min()
score_max = fraud_scores.max()


# =========================
# SAVE SYSTEM
# =========================

fraud_system = {
    "fraud_model": fraud_model,
    "fraud_scaler": fraud_scaler,
    "fraud_features": fraud_features,
    "score_min": score_min,
    "score_max": score_max,
    "risk_thresholds": {
        "critical": 45,
        "high": 30,
        "medium": 20
    },
    "risk_weights": {
        "anomaly": 0.60,
        "price_deviation": 0.40
    }
}


with open(OUTPUT_PATH, "wb") as file:
    pickle.dump(fraud_system, file)


print()
print("===================================")
print("FRAUD MODEL CREATED SUCCESSFULLY!")
print("===================================")
print("Saved to:")
print(OUTPUT_PATH)