import { useState } from "react";
import "./FraudPage.css";

function FraudPage() {
  const [formData, setFormData] = useState({
    registration: "",
    owner: "",
    year: "",
    mileage: "",
    price: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkVehicle = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/fraud-check",
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
        throw new Error(
          data.error || "Fraud detection failed"
        );
      }

      setResult({
        status: data.risk,
        message: data.message,
      });

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the fraud detection server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      registration: "",
      owner: "",
      year: "",
      mileage: "",
      price: "",
    });

    setResult(null);
    setError("");
  };

  return (
    <section className="fraud-page">

      <div className="fraud-left">

        <p className="fraud-label">
          CARVANTA · RISK INTELLIGENCE
        </p>

        <h1>
          Buy with
          <br />
          <span>confidence.</span>
        </h1>

        <p className="fraud-description">
          Check important vehicle information and
          identify suspicious details before making
          a purchase.
        </p>

        <div className="fraud-mark">
          04
        </div>

        <div className="fraud-left-bottom">
          <span>04</span>
          <span>FRAUD DETECTION</span>
        </div>

      </div>


      <div className="fraud-right">

        {!result ? (

          <>

            <div className="fraud-header">

              <p>
                VEHICLE RISK CHECK
              </p>

              <h2>
                Check before
                <br />
                you commit.
              </h2>

            </div>


            <form
              className="fraud-form"
              onSubmit={checkVehicle}
            >

              <div className="fraud-input">

                <label>
                  Registration Number
                </label>

                <input
                  type="text"
                  name="registration"
                  placeholder="Example: TN 01 AB 1234"
                  value={formData.registration}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="fraud-input">

                <label>
                  Number of Previous Owners
                </label>

                <input
                  type="number"
                  name="owner"
                  min="1"
                  placeholder="Example: 2"
                  value={formData.owner}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="fraud-row">

                <div className="fraud-input">

                  <label>
                    Manufacturing Year
                  </label>

                  <input
                    type="number"
                    name="year"
                    placeholder="2020"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="fraud-input">

                  <label>
                    Current Mileage
                  </label>

                  <input
                    type="number"
                    name="mileage"
                    placeholder="45000"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="fraud-input">

                <label>
                  Listed Price
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="Example: 750000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

              </div>


              <button
                className="fraud-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Checking..."
                  : "Check Vehicle Risk →"}
              </button>

            </form>


            {error && (
              <p className="fraud-error">
                {error}
              </p>
            )}

          </>

        ) : (

          <div className="fraud-result">

            <div className="fraud-result-top">

              <span>
                CARVANTA · RISK ANALYSIS
              </span>

              <span>
                ✓
              </span>

            </div>


            <p>
              VEHICLE RISK STATUS
            </p>


            <h2>
              {result.status}
            </h2>


            <p className="fraud-result-text">
              {result.message}
            </p>


            <div className="fraud-checks">

              <div>
                <span>REGISTRATION</span>
                <strong>
                  {formData.registration}
                </strong>
              </div>

              <div>
                <span>OWNERS</span>
                <strong>
                  {formData.owner}
                </strong>
              </div>

              <div>
                <span>YEAR</span>
                <strong>
                  {formData.year}
                </strong>
              </div>

              <div>
                <span>MILEAGE</span>
                <strong>
                  {Number(formData.mileage).toLocaleString("en-IN")} km
                </strong>
              </div>

            </div>


            <button
              className="fraud-reset"
              onClick={handleReset}
            >
              ← Check Another Vehicle
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default FraudPage;