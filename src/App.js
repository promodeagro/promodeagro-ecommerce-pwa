import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./components/SignIn";

const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path={`/home`} element={<Home />} />
            <Route exact path={`/signin`} element={<Signin />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
