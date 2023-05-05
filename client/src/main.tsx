import React from "react";
import Modal from "react-modal";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app.js";

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
