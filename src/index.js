import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Template/App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./ErrorBoundary";
import "./Template/assets/styles/index.css";


if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/Rest/browser");
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
