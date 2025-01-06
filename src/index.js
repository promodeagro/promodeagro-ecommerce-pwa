import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/sass/style.scss";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import AOS from "aos";
// import "aos/dist/aos.css";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import service worker registration

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// AOS.init();

// Register service worker to make it a PWA
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
