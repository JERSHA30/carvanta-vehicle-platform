import { useState } from "react";
import "./RecommendationPage.css";

function RecommendationPage() {
  const [formData, setFormData] = useState({
    "engine-size": "",
    horsepower: "",
    "curb-weight": "",
    "city-mpg": "",
    "highway-mpg": "",
    "wheel-base": "",
    length: "",
    width: "",
    height: "",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendations = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const response = await fetch(
        "https://carvanta-vehicle-platform.onrender.com/api/recommend",
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
          data.error || "Recommendation failed"
        );
      }

      setRecommendations(data.recommendations);

    } catch (error) {
      console.error(error);
      setError(
        "Unable to connect to the recommendation server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      "engine-size": "",
      horsepower: "",
      "curb-weight": "",
      "city-mpg": "",
      "highway-mpg": "",
      "wheel-base": "",
      length: "",
      width: "",
      height: "",
    });

    setRecommendations([]);
    setError("");
  };

  return (
    <section className="recommendation-page">

      <div className="recommendation-left">

        <p className="recommendation-label">
          CARVANTA · SMART RECOMMENDATIONS
        </p>

        <h1>
          Find your
          <br />
          <span>next vehicle.</span>
        </h1>

        <p className="recommendation-description">
          Enter your preferred vehicle specifications
          and discover similar vehicles from our
          intelligent recommendation system.
        </p>

        <div className="recommendation-mark">
          05
        </div>

        <div className="recommendation-left-bottom">
          <span>05</span>
          <span>RECOMMENDATION SYSTEM</span>
        </div>

      </div>


      <div className="recommendation-right">

        {recommendations.length === 0 ? (

          <>

            <div className="recommendation-header">

              <p>VEHICLE MATCH</p>

              <h2>
                Tell us what
                <br />
                you're looking for.
              </h2>

            </div>


            <form
              className="recommendation-form"
              onSubmit={getRecommendations}
            >

              <div className="recommendation-row">

                <div className="recommendation-input">
                  <label>Engine Size</label>
                  <input
                    type="number"
                    name="engine-size"
                    placeholder="Example: 120"
                    value={formData["engine-size"]}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="recommendation-input">
                  <label>Horsepower</label>
                  <input
                    type="number"
                    name="horsepower"
                    placeholder="Example: 100"
                    value={formData.horsepower}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <div className="recommendation-input">
                <label>Curb Weight</label>
                <input
                  type="number"
                  name="curb-weight"
                  placeholder="Example: 2500"
                  value={formData["curb-weight"]}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="recommendation-row">

                <div className="recommendation-input">
                  <label>City MPG</label>
                  <input
                    type="number"
                    name="city-mpg"
                    placeholder="Example: 25"
                    value={formData["city-mpg"]}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="recommendation-input">
                  <label>Highway MPG</label>
                  <input
                    type="number"
                    name="highway-mpg"
                    placeholder="Example: 30"
                    value={formData["highway-mpg"]}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <div className="recommendation-row">

                <div className="recommendation-input">
                  <label>Wheel Base</label>
                  <input
                    type="number"
                    name="wheel-base"
                    placeholder="Example: 98"
                    value={formData["wheel-base"]}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="recommendation-input">
                  <label>Length</label>
                  <input
                    type="number"
                    name="length"
                    placeholder="Example: 175"
                    value={formData.length}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <div className="recommendation-row">

                <div className="recommendation-input">
                  <label>Width</label>
                  <input
                    type="number"
                    name="width"
                    placeholder="Example: 65"
                    value={formData.width}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="recommendation-input">
                  <label>Height</label>
                  <input
                    type="number"
                    name="height"
                    placeholder="Example: 55"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>


              <button
                className="recommendation-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Finding Matches..."
                  : "Find Recommended Vehicles →"}
              </button>

            </form>


            {error && (
              <p className="recommendation-error">
                {error}
              </p>
            )}

          </>

        ) : (

          <div className="recommendation-results">

            <div className="recommendation-results-top">
              <span>CARVANTA · SMART MATCH</span>
              <span>✓</span>
            </div>

            <p>TOP VEHICLE MATCHES</p>

            <h2>
              Vehicles that
              <br />
              match your needs.
            </h2>


            <div className="recommendation-cards">

              {recommendations.map((vehicle, index) => (

                <div
                  className="recommendation-card"
                  key={index}
                >

                  <div className="recommendation-card-number">
                    0{index + 1}
                  </div>

                  <div className="recommendation-card-info">

                    <h3>
                      {vehicle.make}
                    </h3>

                    <p>
                      {vehicle.engine_size} cc ·{" "}
                      {vehicle.horsepower} HP
                    </p>

                    <p>
                      {vehicle.city_mpg} city MPG ·{" "}
                      {vehicle.highway_mpg} highway MPG
                    </p>

                  </div>

                  <div className="recommendation-score">
                    {Math.round(
                      vehicle.similarity * 100
                    )}%
                    <span>match</span>
                  </div>

                </div>

              ))}

            </div>


            <button
              className="recommendation-reset"
              onClick={handleReset}
            >
              ← Search Again
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default RecommendationPage;
