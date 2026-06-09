import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App";
import AppProviders from "./app/providers/AppProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AppProviders>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"

      />
      <App />
    </AppProviders>
  </React.StrictMode>
);