import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { PREFIX_APP_PATH, PREFIX_AUTH_PATH } from "./../Config/Config";
// import CustomersDetails from "./Postlogin/Customers/CustomersDetails";
// import QuatationHistory from "./Postlogin/Quatations/QuatationHistory";
// import Sidebar from "components/Sidebar";
import { useLocation } from "react-router-dom";


import Header from "./../components/Header";
import Footer from "./../components/Footer";


const Home = lazy(() => import("./../pages/home"));
const MyCart = lazy(() => import("./../pages/MyCart"));
const SignIn = lazy(() => import("./../components/SignIn"));
const Views = () => {
    const location = useLocation();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {/* {location.pathname !== "/auth/signup" &&
          location.pathname !== "/auth/signin" &&
          location.pathname !== "/auth/forgot-password" && <Sidebar />} */}

                <Routes>
                    {/* <Route
            exact
            path={`${PREFIX_APP_PATH}/dashboard`}
            element={<Dashboards />}
          /> */}


                    <Route exact path={`/`} element={<Home />} />
                    <Route exact path={`/myCart`} element={<MyCart />} />
                    <Route exact path={`/signin`} element={<SignIn />} />


                    {/* <Route path="*" element={<PathNotFOund />} /> */}
                </Routes>
            </Suspense>
        </>
    );
};

export default Views;
