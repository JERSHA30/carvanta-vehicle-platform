
import { useState } from "react";
import "./MaintenancePage.css";

function MaintenancePage() {
  const [age, setAge] = useState("");
  const [mileage, setMileage] = useState("");
  const [usage, setUsage] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const estimateMaintenance = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "https://carvanta-vehicle-platform.onrender.com/api/maintenance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: age,
            mileage: mileage,
            usage: usage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Maintenance calculation failed"
        );
      }

      setResult(data.estimated_cost);

    } catch (error) {
      console.error(error);
      setError(
        "Unable to connect to the maintenance server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAge("");
    setMileage("");
    setUsage("");
    setResult(null);
    setError("");
  };

  return (
    <section className="maintenance-page">

      <div className="maintenance-left">

        <p className="maintenance-label">
          CARVANTA · OWNERSHIP INTELLIGENCE
        </p>

        <h1>
          Know the
          <br />
          <span>ownership cost.</span>
        </h1>

        <p className="maintenance-description">
          Get an estimated view of your vehicle's future
          maintenance expenses before they become a surprise.
        </p>

        <div className="maintenance-mark">
          03
        </div>

        <div className="maintenance-left-bottom">
          <span>03</span>
          <span>MAINTENANCE ESTIMATION</span>
        </div>

      </div>


      <div className="maintenance-right">

        {!result ? (

          <>

            <div className="maintenance-header">

              <p>
                MAINTENANCE ESTIMATOR
              </p>

              <h2>
                Understand your
                <br />
                future costs.
              </h2>

            </div>


            <form
              className="maintenance-form"
              onSubmit={estimateMaintenance}
            >

              <div className="maintenance-input">

                <label>
                  Vehicle Age (Years)
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Example: 5"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  required
                />

              </div>


              <div className="maintenance-input">

                <label>
                  Current Mileage (km)
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Example: 65000"
                  value={mileage}
                  onChange={(e) =>
                    setMileage(e.target.value)
                  }
                  required
                />

              </div>


              <div className="maintenance-input">

                <label>
                  Usage Level
                </label>

                <select
                  value={usage}
                  onChange={(e) =>
                    setUsage(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Usage
                  </option>

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                </select>

              </div>


              <button
                className="maintenance-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Estimating..."
                  : "Estimate Maintenance Cost →"}
              </button>

            </form>


            {error && (
              <p className="maintenance-error">
                {error}
              </p>
            )}

          </>

        ) : (

          <div className="maintenance-result">

            <div className="maintenance-result-top">

              <span>
                CARVANTA · ESTIMATE
              </span>

              <span>
                ✓
              </span>

            </div>


            <p>
              ESTIMATED YEARLY MAINTENANCE
            </p>


            <h2>
              ₹ {Number(result).toLocaleString("en-IN")}
            </h2>


            <p className="maintenance-result-text">
              This is an approximate estimate based on
              vehicle age, mileage and usage level.
            </p>


            <div className="maintenance-summary">

              <div>
                <span>
                  Vehicle Age
                </span>

                <strong>
                  {age} Years
                </strong>
              </div>


              <div>
                <span>
                  Mileage
                </span>

                <strong>
                  {Number(mileage).toLocaleString("en-IN")} km
                </strong>
              </div>


              <div>
                <span>
                  Usage
                </span>

                <strong>
                  {usage}
                </strong>
              </div>

            </div>


            <button
              className="maintenance-reset"
              onClick={handleReset}
            >
              ← Estimate Another Vehicle
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default MaintenancePage;
