import { useState } from "react";
import "./MaintenancePage.css";

function MaintenancePage() {
  const [age, setAge] = useState("");
  const [mileage, setMileage] = useState("");
  const [usage, setUsage] = useState("");
  const [result, setResult] = useState(null);

  const estimateMaintenance = (e) => {
    e.preventDefault();

    let cost = 0;

    if (age <= 3) cost = 15000;
    else if (age <= 7) cost = 25000;
    else cost = 40000;

    if (mileage > 100000) cost += 10000;
    else if (mileage > 50000) cost += 5000;

    if (usage === "High") cost += 7500;
    if (usage === "Low") cost -= 3000;

    setResult(Math.max(cost, 10000));
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

        <div className="maintenance-mark">03</div>

        <div className="maintenance-left-bottom">
          <span>03</span>
          <span>MAINTENANCE ESTIMATION</span>
        </div>
      </div>


      <div className="maintenance-right">

        {!result ? (
          <>
            <div className="maintenance-header">
              <p>MAINTENANCE ESTIMATOR</p>

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
                <label>Vehicle Age (Years)</label>

                <input
                  type="number"
                  min="0"
                  placeholder="Example: 5"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>


              <div className="maintenance-input">
                <label>Current Mileage (km)</label>

                <input
                  type="number"
                  min="0"
                  placeholder="Example: 65000"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  required
                />
              </div>


              <div className="maintenance-input">
                <label>Usage Level</label>

                <select
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                  required
                >
                  <option value="">Select Usage</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>


              <button
                className="maintenance-button"
                type="submit"
              >
                Estimate Maintenance Cost →
              </button>

            </form>
          </>
        ) : (

          <div className="maintenance-result">

            <div className="maintenance-result-top">
              <span>CARVANTA · ESTIMATE</span>
              <span>✓</span>
            </div>

            <p>ESTIMATED YEARLY MAINTENANCE</p>

            <h2>
              ₹ {result.toLocaleString("en-IN")}
            </h2>

            <p className="maintenance-result-text">
              This is an approximate estimate based on
              vehicle age, mileage and usage level.
            </p>

            <div className="maintenance-summary">

              <div>
                <span>Vehicle Age</span>
                <strong>{age} Years</strong>
              </div>

              <div>
                <span>Mileage</span>
                <strong>
                  {Number(mileage).toLocaleString("en-IN")} km
                </strong>
              </div>

              <div>
                <span>Usage</span>
                <strong>{usage}</strong>
              </div>

            </div>

            <button
              className="maintenance-reset"
              onClick={() => {
                setAge("");
                setMileage("");
                setUsage("");
                setResult(null);
              }}
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