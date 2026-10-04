import { useState } from "react";
import "./EMIPage.css";

function EMIPage() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateEMI = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/emi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: price,
            down_payment: downPayment,
            interest: interest,
            tenure: tenure,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "EMI calculation failed");
      }

      setResult({
        emi: data.emi,
        totalInterest: data.total_interest,
        totalAmount: data.total_amount,
      });

    } catch (error) {
      console.error(error);
      setError("Unable to connect to the EMI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="emi-page">

      <div className="emi-left">

        <p className="emi-label">
          CARVANTA · FINANCING
        </p>

        <h1>
          Plan the
          <br />
          <span>purchase.</span>
        </h1>

        <p className="emi-description">
          Understand your monthly commitment before
          you make your vehicle decision.
        </p>

        <div className="emi-mark">
          ₹
        </div>

      </div>


      <div className="emi-right">

        <div className="emi-form-header">

          <p>
            EMI CALCULATOR
          </p>

          <h2>
            Calculate your monthly payment.
          </h2>

        </div>


        <form
          onSubmit={calculateEMI}
          className="emi-form"
        >

          <div className="emi-input">

            <label>
              Vehicle Price
            </label>

            <input
              type="number"
              placeholder="Example: 850000"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              required
            />

          </div>


          <div className="emi-input">

            <label>
              Down Payment
            </label>

            <input
              type="number"
              placeholder="Example: 150000"
              value={downPayment}
              onChange={(e) =>
                setDownPayment(e.target.value)
              }
              required
            />

          </div>


          <div className="emi-row">

            <div className="emi-input">

              <label>
                Interest Rate (%)
              </label>

              <input
                type="number"
                step="0.1"
                placeholder="Example: 8.5"
                value={interest}
                onChange={(e) =>
                  setInterest(e.target.value)
                }
                required
              />

            </div>


            <div className="emi-input">

              <label>
                Loan Tenure (Years)
              </label>

              <input
                type="number"
                placeholder="Example: 5"
                value={tenure}
                onChange={(e) =>
                  setTenure(e.target.value)
                }
                required
              />

            </div>

          </div>


          <button
            className="emi-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Calculating..."
              : "Calculate EMI →"}
          </button>

        </form>


        {error && (
          <p className="emi-error">
            {error}
          </p>
        )}


        {result && (

          <div className="emi-result">

            <p>
              ESTIMATED MONTHLY EMI
            </p>

            <h3>
              ₹{" "}
              {Math.round(result.emi)
                .toLocaleString("en-IN")}
            </h3>


            <div className="emi-summary">

              <div>

                <span>
                  Total Interest
                </span>

                <strong>
                  ₹{" "}
                  {Math.round(result.totalInterest)
                    .toLocaleString("en-IN")}
                </strong>

              </div>


              <div>

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{" "}
                  {Math.round(result.totalAmount)
                    .toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}

export default EMIPage;