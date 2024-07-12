import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loginDetails } from "./Utills/helperFunctions";
const Home = lazy(() => import("./../Views/PostLogin/home"));
const Category = lazy(() => import("./../Views/PostLogin/category"));
const ProductDetails = lazy(() =>
  import("./../Views/PostLogin/productDetails")
);
const MyCart = lazy(() => import("./../Views/PostLogin/MyCart"));
const SignIn = lazy(() => import("./../Views/PreLogin/SignIn"));
const SignUp = lazy(() => import("./../Views/PreLogin/signUp"));
const Forgot = lazy(() => import("./../Views/PreLogin/ForgotPassword"));
const Address = lazy(() =>
  import("./../Views/PostLogin/MyCart/components/address")
);
const PaymentOption = lazy(() =>
  import("./../Views/PostLogin/MyCart/components/address")
);
const OrderDetails = lazy(() =>
  import("./../Views/PostLogin/MyCart/components/address")
);
const AddNewAddress = lazy(() =>
  import("./../Views/PostLogin/MyCart/components/addNewAddress")
);
const UpdatedAddress = lazy(() =>
  import("./../Views/PostLogin/MyCart/components/updatedAddress")
);
const OrderPlaced = lazy(() =>
  import("./../Views/PostLogin/MyCart/components/orderPlaced")
);
const MyOrder = lazy(() => import("./../Views/PostLogin/myOrder"));

const Views = () => {
  const location = useLocation();
  const isLoggedIn = !!loginDetails()?.token; // Check if user is logged in

  return (
    <>
      <Suspense>
        <Routes>
          {/* Redirect to Home if user is logged in and tries to access signin or signup */}
          {isLoggedIn && (
            <>
              <Route path={`/signin`} element={<Navigate to="/" replace />} />
              <Route path={`/signup`} element={<Navigate to="/" replace />} />
            </>
          )}

          {!isLoggedIn && (
            <>
              <Route path={`/mycart`} element={<Navigate to="/" replace />} />
              <Route
                path={`/mycart/address`}
                element={<Navigate to="/" replace />}
              />
              <Route
                path={`/mycart/address/order-details`}
                element={<Navigate to="/" replace />}
              />
              <Route
                path={`/mycart/payment-details`}
                element={<Navigate to="/" replace />}
              />
              <Route
                path={`/mycart/address/add-new-address`}
                element={<Navigate to="/" replace />}
              />
              <Route
                path={`/mycart/address/updated-address`}
                element={<Navigate to="/" replace />}
              />
              <Route
                path={`/mycart/address/order-placed/:id`}
                element={<Navigate to="/" replace />}
              />
            </>
          )}



          <Route exact path={`/forgot-password`} element={<Forgot />} />
          <Route exact path={`/`} element={<Home />} />
          <Route exact path={`/category`} element={<Category />} />
          <Route
            exact
            path={`/product-details/:id`}
            element={<ProductDetails />}
          />
          <Route exact path={`/mycart`} element={<MyCart />} />
          <Route exact path={`/signin`} element={<SignIn />} />
          <Route exact path={`/signup`} element={<SignUp />} />
          <Route exact path={`/mycart/address`} element={<Address />} />
          <Route
          exact
            path={`/mycart/address/order-details`}
            element={<OrderDetails />}
          />
          <Route path={`/mycart/payment-details`} element={<PaymentOption />} />
          <Route
            exact
            path={`/mycart/address/add-new-address`}
            element={<AddNewAddress />}
          />
          <Route
            exact
            path={`/mycart/address/updated-address`}
            element={<UpdatedAddress />}
          />
          <Route
            exact
            path={`/mycart/address/order-placed/:id`}
            element={<OrderPlaced />}
          />
          <Route exact path={`/my-order`} element={<MyOrder />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Views;
