import { Link } from "react-router-dom";
import "./Features.css";


function Features() {
  const features = [
    {
      number: "01",
      title: "Price Prediction",
      description:
        "Estimate a vehicle's market value using intelligent data-driven analysis.",
      tag: "KNOW THE VALUE",
      id: "price",
    },
    {
      number: "02",
      title: "EMI Calculation",
      description:
        "Understand your monthly payment before making your vehicle purchase.",
      tag: "PLAN YOUR PURCHASE",
      id: "emi",
    },
    {
      number: "03",
      title: "Maintenance",
      description:
        "Get an estimated view of future vehicle ownership and maintenance costs.",
      tag: "OWN WITH CONFIDENCE",
      id: "maintenance",
    },
    {
      number: "04",
      title: "Fraud Detection",
      description:
        "Identify suspicious vehicle information and reduce hidden purchase risks.",
      tag: "BUY WITH CONFIDENCE",
      id: "fraud",
    },
    {
    number: "05",
    title: "Recommendation System",
    description:
      "Discover vehicles that closely match your preferred specifications.",
    tag: "FIND YOUR MATCH",
    id: "recommendation",
  },
];
  

  return (
    <section className="features-section">

      <div className="features-heading">
        <div>
          <p className="section-label">THE CARVANTA DIFFERENCE</p>

          <h2>
            Everything,
            <br />
            <span>but smarter.</span>
          </h2>
        </div>

        <p className="features-intro">
          One platform for the decisions that matter —
          before you buy, while you own, and beyond.
        </p>
      </div>

      <div className="features-grid">

        {features.map((feature) => (
          <Link
  to={
  feature.id === "price"
    ? "/price-prediction"
    : feature.id === "emi"
    ? "/emi-calculator"
    : feature.id === "maintenance"
    ? "/maintenance"
    : feature.id === "fraud"
    ? "/fraud-detection"
    : "/recommendations"
}
  className="feature-card"
  id={feature.id}
  key={feature.id}
>

            <div className="feature-top">
              <span className="feature-number">
                {feature.number}
              </span>

              <span className="feature-arrow">
                ↗
              </span>
            </div>

            <div className="feature-content">

              <p className="feature-tag">
                {feature.tag}
              </p>

              <h3>{feature.title}</h3>

              <p className="feature-description">
                {feature.description}
              </p>

            </div>

            <div className="feature-line"></div>

          </Link>
          
        ))}

      </div>

    </section>
  );
}

export default Features;