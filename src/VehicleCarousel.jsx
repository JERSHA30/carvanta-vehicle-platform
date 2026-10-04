import { useEffect, useState } from "react";

function VehicleCarousel() {
  const slides = [
    {
      image: "/images/car1.jpg",
      number: "01",
      category: "PRICE PREDICTION",
      title: "Know what your vehicle is worth.",
    },
    {
      image: "/images/car2.jpg",
      number: "02",
      category: "EMI CALCULATION",
      title: "Plan your purchase with confidence.",
    },
    {
      image: "/images/car3.jpg",
      number: "03",
      category: "MAINTENANCE",
      title: "Know what ownership will cost.",
    },
    {
      image: "/images/car4.jpg",
      number: "04",
      category: "FRAUD DETECTION",
      title: "Buy smarter. Avoid hidden risks.",
    },
    {
      image: "/images/car5.jpg",
      number: "05",
      category: "VEHICLE INTELLIGENCE",
      title: "One platform. Better decisions.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="carousel-section" id="categories">

      <div className="carousel-heading">
        <div>
          <p className="section-label">
            EXPLORE THE PLATFORM
          </p>

          <h2>
            Everything you need
            <br />
            <span>to choose better.</span>
          </h2>
        </div>

        <p className="carousel-intro">
          From buying to owning, CARVANTA brings
          every important decision into one place.
        </p>
      </div>


      <div className="carousel">

        <div className="carousel-image">

          <img
            key={slides[current].image}
            src={slides[current].image}
            alt={slides[current].category}
          />

          <div className="carousel-overlay"></div>

          <div className="carousel-content">

            <div className="carousel-number">
              {slides[current].number}
            </div>

            <div>
              <p className="carousel-category">
                {slides[current].category}
              </p>

              <h3>
                {slides[current].title}
              </h3>
            </div>

          </div>

        </div>


        <div className="carousel-controls">

          <button onClick={previousSlide}>
            ←
          </button>

          <div className="carousel-progress">

            {slides.map((_, index) => (
              <button
                key={index}
                className={
                  index === current ? "active" : ""
                }
                onClick={() => setCurrent(index)}
              />
            ))}

          </div>

          <button onClick={nextSlide}>
            →
          </button>

        </div>

      </div>

    </section>
  );
}

export default VehicleCarousel;