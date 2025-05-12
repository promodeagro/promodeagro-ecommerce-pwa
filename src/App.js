import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CommonLoader from "./components/CommonLoader";
import Views from "./Views/index";
import { pathFile } from "Views/Utills/helperFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalCartIndicator from "components/GlobalCartIndicator";

function App(props) {
  return (
    <Router>
      <Suspense fallback={CommonLoader}>
        <div className="app">
          <ConditionalHeader />
          <MainContent />
          <GlobalCartIndicator />
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

function ConditionalHeader() {
  const location = useLocation();
  const hideHeaderPaths = [
    "/account",
    "/my-profile/alladdress",
    "/my-profile/privacy",
    "/my-profile/customer-support"
  ];

  const isMobile = window.innerWidth <= 600; 

  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }

  if (location.pathname === "/my-order" && isMobile) {
    return null; 
  }

  return <Header />;
}

function MainContent() {
  const location = useLocation();
  useEffect(() => {
    if (location) {
      let locationToArr = location.pathname.split("/");
      for (let locationIndex = locationToArr.length - 1; locationIndex >= 0; locationIndex--) {
        const value = locationToArr[locationIndex];
        if (pathFile[value]) {
          document.title = pathFile[value];
          break;
        }
      }
    }
  }, [location]);

  return (
    <Routes>
      <Route path="*" element={<Views />} />
    </Routes>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
