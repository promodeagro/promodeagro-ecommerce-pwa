// import React, { lazy, Suspense } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";


// const Home = lazy(() => import("./pages/home"));
// const MyCart = lazy(() => import("./pages/MyCart"));
// const SignIn = lazy(() => import("./components/SignIn"));
// function App() {
//   return (
//     <div className="app">
//       <Router>
//         <Header />
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             <Route exact path={`/`} element={<Home />} />
//             <Route exact path={`/myCart`} element={<MyCart />} />
//             <Route exact path={`/signin`} element={<SignIn />} />
//           </Routes>
//         </Suspense>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;












import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Views from "./Views/index";
// import { useLocation } from "react-router-dom";
// import { pathFile } from "Utils/helperFunctions";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
// import { setThemeMode } from "Redux-Store/ThemeMode/ThemeModeSlice";
// import { getThemeModeFromLocalStorage } from "Utils";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App(props) {
  // const location = useLocation();

  return (
    <Router>
      <div className="app">
        {/* {window.location.pathname !== "/auth/signup" &&
          window.location.pathname !== "/auth/signin" &&
          window.location.pathname !== "/auth/forgot-password" && <Header />} */}
        <Header />
        <MainContent />
        <Footer />
        {/* <ToastContainer
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
        /> */}
      </div>
    </Router>
  );
}
function MainContent() {
  // const location = useLocation();
  // useEffect(() => {
  //   if (location) {
  //     let locationToArr = location.pathname.split("/");

  //     for (
  //       let locationIndex = locationToArr.length - 1;
  //       locationIndex >= 0;
  //       locationIndex--
  //     ) {
  //       const value = locationToArr[locationIndex];

  //       if (pathFile[value]) {
  //         document.title = pathFile[value];
  //         break;
  //       }
  //     }
  //   }
  // });
  return (
    <Routes>
      <Route path="*" element={<Views />} />
    </Routes>
  );
}
function mapStateToProps(state) {
  const { } = state;
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

