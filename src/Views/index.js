import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loginDetails } from "./Utills/helperFunctions";
const Home = lazy(() => import("./../Views/PostLogin/home"));
const AboutUs = lazy(() => import("./../Views/PostLogin/aboutUs"));
const ContactUs = lazy(() => import("./../Views/PostLogin/contactUs"));
const TermsCondition = lazy(() =>
  import("./../Views/PostLogin/termsCondition")
);
const PrivacyPolicy = lazy(() => import("./../Views/PostLogin/privacyPolicy"));
const ReturnRefund = lazy(() => import("./../Views/PostLogin/returnRefund"));

const PersonalInformation = lazy(() =>
  import("./../Views/PostLogin/myProfile/personalInformation")
);
const ManageAddresses = lazy(() =>
  import("./../Views/PostLogin/myProfile/manageAddresses")
);
const ChangePassword = lazy(() =>
  import("./../Views/PostLogin/myProfile/changePassword")
);
const WishList = lazy(() => import("./../Views/PostLogin/myProfile/wishList"));
const Notification = lazy(() =>
  import("./../Views/PostLogin/myProfile/notification")
);
const AccountPrivacy = lazy(() =>
  import("./../Views/PostLogin/myProfile/accountPrivacy")
);
const CategoryOne = lazy(() => import("./../Views/PostLogin/category"));
const CategoryTwo = lazy(() => import("./../Views/PostLogin/category"));
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
    <Suspense fallback={<></>}>
      <Routes location={location}>
        {/* Redirect to Home if user is logged in and tries to access signin or signup */}
        {isLoggedIn && (
          <>
            <Route path={`/signin`} element={<Navigate to="/" replace />} />
            <Route path={`/signup`} element={<Navigate to="/" replace />} />
          </>
        )}

        {/* Redirect to Home if user is not logged in and tries to access mycart related pages */}
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
              path={`/mycart/address/updated-address/:id`}
              element={<Navigate to="/" replace />}
            />
               <Route
              path={`/my-profile/address/updated-address/:id`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/mycart/address/order-placed/:id`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/wish-list`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/manage-addresses`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/personal-information`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/change-password`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/wish-list`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/notification`}
              element={<Navigate to="/" replace />}
            />
            <Route
              path={`/my-profile/account-privacy`}
              element={<Navigate to="/" replace />}
            />
          </>
        )}

        <Route path={`/forgot-password`} element={<Forgot />} />
        <Route path={`/`} element={<Home />} />
        <Route exact path={`/about-us`} element={<AboutUs />} />
        <Route exact path={`/contact-us`} element={<ContactUs />} />
        <Route exact path={`/terms-condition`} element={<TermsCondition />} />
        <Route exact path={`/privacy-policy`} element={<PrivacyPolicy />} />
        <Route exact path={`/return-refund`} element={<ReturnRefund />} />
        <Route
          exact
          path={`/my-profile/personal-information`}
          element={<PersonalInformation />}
        />
        <Route
          exact
          path={`/my-profile/manage-addresses`}
          element={<ManageAddresses />}
        />
        <Route
          exact
          path={`/my-profile/change-password`}
          element={<ChangePassword />}
        />
        <Route exact path={`/my-profile/wish-list`} element={<WishList />} />
        <Route
          exact
          path={`/my-profile/notification`}
          element={<Notification />}
        />
        <Route
          exact
          path={`/my-profile/account-privacy`}
          element={<AccountPrivacy />}
        />
        <Route
          path={`/category/:category/:subcategory`}
          element={<Category />}
        />
        <Route path={`/category/:category`} element={<Category />} />

        <Route path={`/category`} element={<Category />} />
        <Route
          path={`/product-details/:category/:subcategory/:id`}
          element={<ProductDetails />}
        />

        <Route path={`/product-details/:id`} element={<ProductDetails />} />
        <Route path={`/mycart`} element={<MyCart />} />
        <Route path={`/signin`} element={<SignIn />} />
        <Route path={`/signup`} element={<SignUp />} />
        <Route path={`/mycart/address`} element={<Address />} />
        <Route
          path={`/mycart/address/order-details`}
          element={<OrderDetails />}
        />
        <Route path={`/mycart/payment-details`} element={<PaymentOption />} />
        <Route
          path={`/mycart/address/add-new-address`}
          element={<AddNewAddress />}
        />
        <Route
          path={`/mycart/address/updated-address/:id`}
          element={<UpdatedAddress />}
        />
         <Route
          path={`/my-profile/address/updated-address/:id`}
          element={<UpdatedAddress />}
        />
        <Route
          path={`/mycart/address/order-placed/:id`}
          element={<OrderPlaced />}
        />
        <Route path={`/my-order`} element={<MyOrder />} />
      </Routes>
    </Suspense>
  );
};

export default Views;
