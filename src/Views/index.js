import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = lazy(() => import("./../Views/PostLogin/home"));
const Category = lazy(() => import("./../Views/PostLogin/category"));
const ProductDetails = lazy(() => import("./../Views/PostLogin/productDetails"));
const MyCart = lazy(() => import("./../Views/PostLogin/MyCart"));
const SignIn = lazy(() => import("./../Views/PreLogin/SignIn"));
const Address = lazy(() => import("./../Views/PostLogin/MyCart/components/address"));
const AddNewAddress = lazy(() => import("./../Views/PostLogin/MyCart/components/addNewAddress"));
const OrderPlaced = lazy(() => import("./../Views/PostLogin/MyCart/components/orderPlaced"));
const MyOrder = lazy(() => import("./../Views/PostLogin/myOrder"));

const Views = () => {
  const location = useLocation();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path={`/`} element={<Home />} />
          <Route exact path={`/category`} element={<Category />} />
          <Route exact path={`/product-details`} element={<ProductDetails />} />
          <Route exact path={`/myCart`} element={<MyCart />} />
          <Route exact path={`/signin`} element={<SignIn />} />
          <Route exact path={`/myCart/address`} element={<Address />} />
          <Route exact path={`/myCart/address/add-new-address`} element={<AddNewAddress />} />
          <Route exact path={`/myCart/address/order-placed`} element={<OrderPlaced />} />
          <Route exact path={`/my-order`} element={<MyOrder />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default Views;
