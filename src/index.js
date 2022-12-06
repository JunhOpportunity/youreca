import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "./firebase";
import "./default.css";
import { AnimatePresence } from "framer-motion";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AnimatePresence>
    <App />
  </AnimatePresence>

  // </React.StrictMode>
);

reportWebVitals();
