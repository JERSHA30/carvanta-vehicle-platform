import { useState } from "react";

function EMICalculator() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();

    const vehiclePrice = Number(price);
    const down = Number(downPayment);
    const annualInterest = Number(interest);
    const years = Number(tenure);

    const loanAmount = vehiclePrice - down;
    const monthlyInterest = annualInterest / 12 / 100;
    const months = years * 12;

    if (loanAmount <= 0 || annualInterest <= 0 || years <= 0) {
      return;
    }

    const monthlyEMI =
      (loanAmount *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, months)) /
      (Math.pow(1 + monthlyInterest, months) - 1);

    setEmi(monthlyEMI);
  };

  const resetCalculator = () => {
    setPrice("");
    setDownPayment("");
    setInterest("");
    setTenure("");
    setEmi(null);
  };

  return (
    <section className="emi-section" id="emi">

      <div className="form-heading">
        <p className="tag">EMI CALCULATOR</p>

        <h2>Calculate Your Monthly EMI</h2>

        <p>
          Estimate your monthly vehicle loan payment easily.
        </p>
      </div>

      <div className="emi-container">

        <form className="emi-form" onSubmit={calculateEMI}>

          <div className="input-group">
            <label>Vehicle Price (₹)</label>
            <input
              type="number"
              placeholder="Example: 850000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Down Payment (₹)</label>
            <input
              type="number"
              placeholder="Example: 150000"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Example: 8.5"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Loan Tenure (Years)</label>
            <input
              type="number"
              placeholder="Example: 5"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              required
            />
          </div>

          <button className="predict-btn" type="submit">
            Calculate EMI →
          </button>

        </form>

        {emi !== null && (
          <div className="emi-result">

            <p className="result-label">YOUR MONTHLY EMI</p>

            <h2>
              ₹ {emi.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </h2>

            <div className="emi-details">

              <div>
                <span>Vehicle Price</span>
                <strong>
                  ₹ {Number(price).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Down Payment</span>
                <strong>
                  ₹ {Number(downPayment).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Interest Rate</span>
                <strong>{interest}%</strong>
              </div>

              <div>
                <span>Loan Tenure</span>
                <strong>{tenure} Years</strong>
              </div>

            </div>

            <button
              className="reset-btn"
              onClick={resetCalculator}
            >
              Reset Calculator
            </button>

          </div>
        )}

      </div>

    </section>
  );
}

export default EMICalculator;