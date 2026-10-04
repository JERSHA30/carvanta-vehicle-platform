import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import VehicleCarousel from "./VehicleCarousel";
import Features from "./Features";
import RecommendationPage from "./RecommendationPage";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ================= SMART NAVBAR + SCROLL PROGRESS =================

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar while scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        // Show navbar while scrolling up
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;

      // Calculate scroll progress
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        totalHeight > 0
          ? (currentScrollY / totalHeight) * 100
          : 0;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app">

      {/* ================= SCROLL PROGRESS ================= */}

      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>


      {/* ================= NAVBAR ================= */}

      <nav
        className={`navbar ${
          showNavbar ? "navbar-visible" : "navbar-hidden"
        }`}
      >

        {/* LOGO */}

        <Link to="/" className="logo">
          <span>V</span>
          CARVANTA
        </Link>


        {/* NAVIGATION */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>


          {/* ================= WHAT'S INSIDE ================= */}

          <div className="category-menu">

            <button className="category-trigger">
              WHAT'S INSIDE <span>✦</span>
            </button>


            {/* DROPDOWN */}

            <div className="category-dropdown">

              <div className="dropdown-top">
                <span>EXPLORE CARVANTA</span>

                <p>
                  Smart tools for every vehicle decision.
                </p>
              </div>


              {/* PRICE PREDICTION */}

              <Link to="/price-prediction">

                <div className="tool-icon">
                  01
                </div>

                <div className="tool-info">
                  <strong>
                    Price Prediction
                  </strong>

                  <small>
                    Know your vehicle's real value
                  </small>
                </div>

                <span className="tool-arrow">
                  ↗
                </span>

              </Link>


              {/* EMI */}

              <Link to="/emi-calculator">

                <div className="tool-icon">
                  02
                </div>

                <div className="tool-info">
                  <strong>
                    EMI Calculation
                  </strong>

                  <small>
                    Plan your monthly payments
                  </small>
                </div>

                <span className="tool-arrow">
                  ↗
                </span>

              </Link>


              {/* MAINTENANCE */}

              <Link to ="/maintenance">

                <div className="tool-icon">
                  03
                </div>

                <div className="tool-info">
                  <strong>
                    Maintenance
                  </strong>

                  <small>
                    Estimate future ownership cost
                  </small>
                </div>

                <span className="tool-arrow">
                  ↗
                </span>

              </Link>


              {/* FRAUD DETECTION */}

              <Link to="/fraud-detection">

        <div className="tool-icon">
    04
  </div>

  <div className="tool-info">
    <strong>
      Fraud Detection
    </strong>

    <small>
      Identify suspicious vehicle details
    </small>
  </div>

  <span className="tool-arrow">
    ↗
  </span>

</Link>
<Link to="/recommendations">

  <div className="tool-icon">
    05
  </div>

  <div className="tool-info">
    <strong>
      Recommentation system
    </strong>

    <small>
      Identify suspicious vehicle details
    </small>
  </div>

  <span className="tool-arrow">
    ↗
  </span>

</Link>

            </div>

          </div>


          {/* ABOUT */}

          <a href="#about">
            About
          </a>

        </div>


        {/* GET STARTED */}

        <Link to="/price-prediction" className="nav-button">
          Get Started ↗
        </Link>

      </nav>


      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
      >

        {/* HERO LEFT */}

        <div className="hero-left">

          <p className="eyebrow">
            VEHICLE INTELLIGENCE PLATFORM
          </p>


          <h1>
            Choose
            <br />
            <span>with intent.</span>
          </h1>


          <p className="hero-description">
            Smart insights for better vehicle decisions —
            from price prediction to ownership planning.
          </p>


          <Link to="/price-prediction" className="hero-button">
            Explore Platform

            <span>
              ↗
            </span>
          </Link>

        </div>


        {/* HERO RIGHT */}

        <div className="hero-right">

          <div className="image-frame">

            <img
              src="/images/cars.jpg"
              alt="Premium vehicle"
            />


            <div className="image-label">

              <span>
                01
              </span>

              <p>
                DRIVE SMARTER
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= VEHICLE CAROUSEL ================= */}

      <VehicleCarousel />


      {/* ================= FEATURES ================= */}

      <Features />


      {/* ================= ABOUT ================= */}

<section className="about-section" id="about">

  <div className="about-top">
    <p className="section-label">
      ABOUT CARVANTA
    </p>

    <span className="about-number">
      05 / ABOUT
    </span>
  </div>


  <div className="about-main">

    <div className="about-title">
      <h2>
        Smarter choices.
        <br />
        <span>Better ownership.</span>
      </h2>
    </div>


    <div className="about-text">

      <p className="about-lead">
        CARVANTA simplifies the vehicle buying journey
        by bringing important insights into one platform.
      </p>

      <p>
        From estimating vehicle price and calculating EMI
        to understanding maintenance costs, detecting
        suspicious details and finding suitable vehicles,
        CARVANTA helps you make informed decisions.
      </p>

      <div className="about-line"></div>

      <p className="about-tagline">
        DATA → INSIGHT → DECISION
      </p>

    </div>

  </div>


  <div className="about-bottom">

    <span>
      VEHICLE INTELLIGENCE PLATFORM
    </span>

    <span>
      CARVANTA © 2026
    </span>

  </div>

</section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-minimal">

          <p>
            Thank you.
          </p>


          <button
            className="footer-top-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
          >
            ↑
          </button>

        </div>

      </footer>

    </div>
  );
}

export default App;
