import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store";
import App from "./App";
const Router =
  process.env.NODE_ENV === "development" ? HashRouter : BrowserRouter;

ReactDOM.render(
  <Provider store={store}>
    {/* <HashRouter> */}
      <React.StrictMode>
        <Router>
        <App />
        </Router>
      </React.StrictMode>
    {/* </HashRouter> */}
  </Provider>,
  document.getElementById("root")
);
