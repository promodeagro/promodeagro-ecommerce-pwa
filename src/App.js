import React, { Suspense, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommonLoader from "./components/CommonLoader";
import Views from "./Views/index";
import { useLocation } from "react-router-dom";
import { pathFile } from "Views/Utills/helperFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalCartIndicator from "components/GlobalCartIndicator";
 
function App(props) {
//   if (!window.location.href.includes("www.promodeagro.com")) {
//     window.location.href = "https://www.promodeagro.com";
// }
  return (
    <Router>
      <Suspense fallback={CommonLoader}>
        <div className="app">
          <Header />
          <MainContent />
          <GlobalCartIndicator/>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={1} 
            
          />
        </div>
      </Suspense>
    </Router>
  );
}
function MainContent() {
  const location = useLocation();
  useEffect(() => {
    if (location) {
      let locationToArr = location.pathname.split("/");
      for (
        let locationIndex = locationToArr.length - 1;
        locationIndex >= 0;
        locationIndex--
      ) {
        const value = locationToArr[locationIndex];

        if (pathFile[value]) {
          document.title = pathFile[value];
          break;
        }
      }
    }
  });
  return (
    <Routes>
      <Route path="*" element={<Views />} />
    </Routes>
  );
}
function mapStateToProps(state) {
  const {} = state;
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
