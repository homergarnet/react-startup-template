import React from "react";
import ReactDOM from "react-dom/client"; // Vite supports this by default
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// Ensure the root element exists in your `index.html` file with id "root"
const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
