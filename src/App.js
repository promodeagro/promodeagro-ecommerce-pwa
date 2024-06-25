import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/home"));
const MyCart = lazy(() => import("./pages/MyCart"));
const SignIn = lazy(() => import("./components/SignIn"));
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path={`/`} element={<Home />} />
            <Route exact path={`/myCart`} element={<MyCart />} />
            <Route exact path={`/signin`} element={<SignIn />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
