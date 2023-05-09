import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Authcontext } from "./auth/authentication";
import "./index.css";

ReactDom.render(
  <>
    <BrowserRouter>
      <Authcontext>
        <App />
      </Authcontext>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
