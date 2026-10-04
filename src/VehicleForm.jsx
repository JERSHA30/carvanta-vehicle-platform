import { useState } from "react";
import "./VehicleForm.css";

function VehicleForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    transmission: "",
    engine: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= VEHICLE MODELS =================

  const vehicleModels = {
    Toyota: ["Innova Crysta", "Fortuner", "Camry", "Glanza", "Urban Cruiser"],
    Honda: ["City", "Civic", "Amaze", "Elevate", "WR-V"],
    Hyundai: ["Creta", "i20", "Verna", "Venue", "Grand i10"],
    Maruti: ["Swift", "Baleno", "Brezza", "Dzire", "Ertiga"],
    Tata: ["Nexon", "Harrier", "Punch", "Altroz", "Safari"],
    Mahindra: ["XUV700", "Scorpio", "Thar", "XUV300", "Bolero"],
    Kia: ["Seltos", "Sonet", "Carens", "EV6"],
    Ford: ["EcoSport", "Endeavour", "Figo", "Aspire"],
    Volkswagen: ["Polo", "Virtus", "Taigun", "Tiguan"],
    Renault: ["Kwid", "Kiger", "Triber", "Duster"],
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      ...(name === "brand" ? { model: "" } : {}),
    });

    setError("");
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      setPrediction(data.predicted_price);
      setSubmitted(true);

      console.log("Prediction:", data);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================

  const handleReset = () => {
    setFormData({
      brand: "",
      model: "",
      year: "",
      mileage: "",
      fuel: "",
      transmission: "",
      engine: "",
    });

    setPrediction(null);
    setSubmitted(false);
    setError("");
  };

  return (
    <section className="vehicle-page">

      {/* ================= LEFT SIDE ================= */}

      <div className="vehicle-page-left">

        <p className="vehicle-label">
          CARVANTA · PRICE INTELLIGENCE
        </p>

        <h1>
          Know the
          <br />
          <span>real value.</span>
        </h1>

        <p className="vehicle-description">
          Enter a few details about your vehicle and
          get an estimated market value based on
          intelligent data-driven analysis.
        </p>

        <div className="vehicle-page-mark">
          ₹
        </div>

        <div className="vehicle-left-bottom">
          <span>01</span>
          <span>PRICE PREDICTION</span>
        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="vehicle-page-right">

        {!submitted ? (

          <>

            <div className="vehicle-form-header">

              <p>VEHICLE DETAILS</p>

              <h2>
                Tell us about
                <br />
                your vehicle.
              </h2>

            </div>


            <form
              className="vehicle-form"
              onSubmit={handleSubmit}
            >

              {/* BRAND */}

              <div className="input-group">

                <label>Vehicle Brand</label>

                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Brand
                  </option>

                  {Object.keys(vehicleModels).map(
                    (brand) => (
                      <option
                        value={brand}
                        key={brand}
                      >
                        {brand}
                      </option>
                    )
                  )}

                </select>

              </div>


              {/* MODEL */}

              <div className="input-group">

                <label>Vehicle Model</label>

                <select
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  disabled={!formData.brand}
                  required
                >

                  <option value="">
                    {formData.brand
                      ? "Select Model"
                      : "Select Brand First"}
                  </option>

                  {formData.brand &&
                    vehicleModels[formData.brand].map(
                      (model) => (
                        <option
                          value={model}
                          key={model}
                        >
                          {model}
                        </option>
                      )
                    )}

                </select>

              </div>


              {/* YEAR + MILEAGE */}

              <div className="input-row">

                <div className="input-group">

                  <label>
                    Manufacturing Year
                  </label>

                  <input
                    type="number"
                    name="year"
                    min="1990"
                    max="2026"
                    placeholder="2020"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="input-group">

                  <label>
                    Mileage (km)
                  </label>

                  <input
                    type="number"
                    name="mileage"
                    min="0"
                    placeholder="45000"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* FUEL + TRANSMISSION */}

              <div className="input-row">

                <div className="input-group">

                  <label>Fuel Type</label>

                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Fuel
                    </option>

                    <option value="Petrol">
                      Petrol
                    </option>

                    <option value="Diesel">
                      Diesel
                    </option>

                    <option value="CNG">
                      CNG
                    </option>

                    <option value="Electric">
                      Electric
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>

                  </select>

                </div>


                <div className="input-group">

                  <label>Transmission</label>

                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Transmission
                    </option>

                    <option value="Manual">
                      Manual
                    </option>

                    <option value="Automatic">
                      Automatic
                    </option>

                  </select>

                </div>

              </div>


              {/* ENGINE */}

              <div className="input-group">

                <label>
                  Engine Capacity (cc)
                </label>

                <input
                  type="number"
                  name="engine"
                  min="500"
                  placeholder="1500"
                  value={formData.engine}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* ERROR */}

              {error && (
                <p className="error-message">
                  {error}
                </p>
              )}


              {/* BUTTON */}

              <button
                className="predict-btn"
                type="submit"
                disabled={loading}
              >

                {loading
                  ? "Analysing Vehicle..."
                  : "Predict Vehicle Price →"}

              </button>

            </form>

          </>

        ) : (

          /* ================= RESULT ================= */

          <div className="prediction-result">

            <div className="result-top">

              <span>
                CARVANTA · ANALYSIS COMPLETE
              </span>

              <span>
                ✓
              </span>

            </div>


            <p className="result-label">
              ESTIMATED MARKET VALUE
            </p>


            <h2>
              ₹{" "}
              {Number(prediction).toLocaleString(
                "en-IN"
              )}
            </h2>


            <p className="result-description">
              Estimated vehicle price based on the
              information provided.
            </p>


            <div className="vehicle-summary">

              <div>
                <span>Brand</span>
                <strong>
                  {formData.brand}
                </strong>
              </div>

              <div>
                <span>Model</span>
                <strong>
                  {formData.model}
                </strong>
              </div>

              <div>
                <span>Year</span>
                <strong>
                  {formData.year}
                </strong>
              </div>

              <div>
                <span>Mileage</span>
                <strong>
                  {Number(
                    formData.mileage
                  ).toLocaleString("en-IN")}{" "}
                  km
                </strong>
              </div>

            </div>


            <button
              className="reset-btn"
              onClick={handleReset}
            >
              ← Analyse Another Vehicle
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default VehicleForm;