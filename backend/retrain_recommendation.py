import os
import pickle
import pandas as pd

from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity


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
    "vehicle_recommendation_system_new.pkl"
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
# RECOMMENDATION FEATURES
# =========================

recommendation_features = [
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


# =========================
# CLEAN DATA
# =========================

recommendation_df = df[
    ["make"] + recommendation_features
].copy()

for col in recommendation_features:
    recommendation_df[col] = pd.to_numeric(
        recommendation_df[col],
        errors="coerce"
    )

recommendation_df = recommendation_df.dropna().reset_index(drop=True)

print(
    "Recommendation data:",
    recommendation_df.shape
)


# =========================
# SCALING
# =========================

scaler = StandardScaler()

scaled_features = scaler.fit_transform(
    recommendation_df[recommendation_features]
)


# =========================
# SIMILARITY MATRIX
# =========================

similarity_matrix = cosine_similarity(
    scaled_features
)


# =========================
# SAVE MODEL
# =========================

recommendation_system = {
    "features": recommendation_features,
    "scaler": scaler,
    "similarity_matrix": similarity_matrix,
    "recommendation_df": recommendation_df
}


with open(OUTPUT_PATH, "wb") as file:
    pickle.dump(
        recommendation_system,
        file
    )


print()
print("==========================================")
print("RECOMMENDATION MODEL CREATED SUCCESSFULLY!")
print("==========================================")
print("Saved to:")
print(OUTPUT_PATH)