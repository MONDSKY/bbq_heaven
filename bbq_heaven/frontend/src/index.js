
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import App from "./App";
import "./style.css";

// =========================
// PAYPAL CONFIG
// =========================
// Replace with your real client ID
const PAYPAL_CLIENT_ID = "AeVQF6kn5p3Tjc4CsNqEifYY0wSC_TSdL8Iwgi-ynhBh3ssSZs8HQXtk_U-GF3jrJT3XgU14oV2oJkcn";

// =========================
// ROOT RENDER
// =========================
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>

    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: "PHP",
        intent: "capture"
      }}
    >

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </PayPalScriptProvider>

  </React.StrictMode>
);