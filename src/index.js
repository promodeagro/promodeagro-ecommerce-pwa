import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/sass/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AOS from "aos";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "aos/dist/aos.css";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
AOS.init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// Register service worker with auto-update functionality
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });

      // Refresh page to load the new service worker
      registration.waiting.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
    }
  },
});


reportWebVitals();
