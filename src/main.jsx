import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import VehicleForm from "./VehicleForm";
import EMIPage from "./EMIPage";
import MaintenancePage from "./MaintenancePage";
import FraudPage from "./FraudPage";
import RecommendationPage from "./RecommendationPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

        {/* Homepage */}
        <Route path="/" element={<App />} />

        {/* Price Prediction */}
        <Route
          path="/price-prediction"
          element={<VehicleForm />}
        />

        {/* EMI Calculator */}
        <Route
          path="/emi-calculator"
          element={<EMIPage />}
        />
        <Route
  path="/maintenance"
  element={<MaintenancePage />}
/>

<Route
  path="/fraud-detection"
  element={<FraudPage />}
/>
<Route
  path="/recommendations"
  element={<RecommendationPage />}
/>

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);
