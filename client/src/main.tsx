import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app.js";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
