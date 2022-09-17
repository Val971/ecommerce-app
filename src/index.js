import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./context/UserAuthContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CartContextProvider>
    <UserContextProvider>
        <App />
    </UserContextProvider>
    </CartContextProvider>
  </Router>
);

reportWebVitals();
