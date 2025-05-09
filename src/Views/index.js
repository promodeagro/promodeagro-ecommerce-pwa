import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loginDetails } from "./Utills/helperFunctions";

const Home = lazy(() => import("./../Views/PostLogin/home"));
const AboutUs = lazy(() => import("./../Views/PostLogin/aboutUs"));
const ContactUs = lazy(() => import("./PostLogin/myProfile/contactUs"));
const TermsCondition = lazy(() =>
  import("./../Views/PostLogin/termsCondition")
);
const PageNotFound = lazy(() => import("../components/PageNotFound"));
const PrivacyPolicy = lazy(() => import("./../Views/PostLogin/privacyPolicy"));
const ReturnRefund = lazy(() => import("./../Views/PostLogin/returnRefund"));

const Account = lazy(() => import("./../Views/PostLogin/account"));
const Cart = lazy(() => import("./../Views/PostLogin/Cart"));
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
const AllAddress = lazy(() =>
  import("./../Views/PostLogin/myProfile/addaddress")
);
const Privacy = lazy(() =>
  import("./../Views/PostLogin/myProfile/privacy")
);
const CustomerSupport = lazy(() =>
  import("./../Views/PostLogin/myProfile/customerSupport")
);



const AddNewAddressessModal = lazy(() =>
  import("./../Views/PostLogin/myProfile/addaddress/addnewwaddress")
);

const Notification = lazy(() =>
  import("./../Views/PostLogin/myProfile/notification")
);
const AccountPrivacy = lazy(() =>
  import("./../Views/PostLogin/myProfile/accountPrivacy")
);

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
  const isLoggedIn = !!loginDetails()?.token;

  return (
    <Routes location={location}>
      {isLoggedIn && (
        <>
          <Route path={`/signin`} element={<Navigate to="/" replace />} />
          <Route path={`/signup`} element={<Navigate to="/" replace />} />
        </>
      )}

      {!isLoggedIn && (
        <>
          <Route path={`/cart`} element={<Navigate to="/" replace />} />
          <Route path={`/account`} element={<Navigate to="/" replace />} />
          <Route path={`/my-order`} element={<Navigate to="/" replace />} />
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
            path={`/my-profile/manage-addresses/add-new-address`}
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
            path={`/my-profile/alladdress
              `}
            element={<Navigate to="/" replace />}
          />
                    <Route
            path={`/my-profile/privacy

              `}
            element={<Navigate to="/" replace />}
          />
                              <Route
            path={`/my-profile/customer-support

              `}
            element={<Navigate to="/" replace />}
          />


<Route
  exact
  path="/my-profile/alladdress/addnewaddress"
  element={<AddNewAddressessModal />}
/>
<Route
  exact
  path="/my-profile/alladdress/addnewaddress/:addressId"
  element={<AddNewAddressessModal />}
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
            path={`/my-profile/alladdress`}
            element={<Navigate to="/" replace />}
          />
                    <Route
            path={`/my-profile/privacy`}
            element={<Navigate to="/" replace />}
          />
                              <Route
            path={`/my-profile/customer-support`}
            element={<Navigate to="/" replace />}
          />


                    <Route
            path={`/my-profile/alladdress/addnewaddress`}
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
                <Route exact path={`/my-profile/contact-us`} 
            element={<Navigate to="/" replace />}
            />

        </>
      )}

      <Route path={`/forgot-password`} element={<Forgot />} />
      <Route path={`/`} element={<Home />} />
      <Route exact path={`/about-us`} element={<AboutUs />} />
      <Route exact path={`/my-profile/contact-us`} element={<ContactUs />} />
      <Route exact path={`/terms-condition`} element={<TermsCondition />} />
      <Route exact path={`/privacy-policy`} element={<PrivacyPolicy />} />
      <Route exact path={`/return-refund`} element={<ReturnRefund />} />
      <Route exact path={`/account`} element={<Account />} />
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
      <Route exact path={`/my-profile/alladdress`} element={<AllAddress />} />
      <Route exact path={`/my-profile/privacy`} element={<Privacy />} />
      <Route exact path={`/my-profile/customer-support`} element={<CustomerSupport />} />

      <Route exact path={`/my-profile/alladdress/addnewaddress`} element={<AddNewAddressessModal />} />
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
      <Route path={`/category/:category/:subcategory`} element={<Category />} />
      <Route path={`/category/:category`} element={<Category />} />

      <Route path={`/category`} element={<Category />} />

      <Route path={`/category/offers/:id`} element={<Category />} />
      <Route
        path={`/product-details/:category/:subcategory/:groupId`}
        element={<ProductDetails />}
      />

      <Route path={`/product-details/:id`} element={<ProductDetails />} />
      <Route path={`/mycart`} element={<MyCart />} exact />
      <Route path={`/signin`} element={<SignIn />} exact />
      <Route path={`/signup`} element={<SignUp />} exact />
      <Route path={`/mycart/address`} element={<Address />} />
      <Route
        exact
        path={`/mycart/address/order-details`}
        element={<OrderDetails />}
      />
      <Route
        path={`/mycart/payment-details`}
        exact
        element={<PaymentOption />}
      />
      <Route
        exact
        path={`/mycart/address/add-new-address`}
        element={<AddNewAddress />}
      />
      <Route
        exact
        path={`/my-profile/manage-addresses/add-new-address`}
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
        exact
        path={`/mycart/address/order-placed/:id`}
        element={<OrderPlaced />}
      />
      <Route exact path={`cart`} element={<Cart />} />
      <Route path={`/my-order`} exact element={<MyOrder />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Views;
