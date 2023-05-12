import React from "react";
import Modal from "react-modal";  
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import App from "./app.js";
import { store, persistor } from './redux/RedaxStor';


Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App  />
    </PersistGate>
    </Provider>
  </Router>
);
