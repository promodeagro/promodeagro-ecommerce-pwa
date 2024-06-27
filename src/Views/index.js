import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = lazy(() => import("./../Views/PostLogin/home"));
const Category = lazy(() => import("./../Views/PostLogin/category"));
const MyCart = lazy(() => import("./../Views/PostLogin/MyCart"));
const SignIn = lazy(() => import("./../components/SignIn"));
const Address = lazy(() => import("./../Views/PostLogin/MyCart/components/address"));

const Views = () => {
  const location = useLocation();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path={`/`} element={<Home />} />
          <Route exact path={`/category`} element={<Category />} />
          <Route exact path={`/myCart`} element={<MyCart />} />
          <Route exact path={`/signin`} element={<SignIn />} />
          <Route exact path={`/myCart/address`} element={<Address />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Views;
