import { configureStore } from "@reduxjs/toolkit";
import HomeReducer from "./Home/HomeSlice";
import SigninSlice from "./Signin/SigninSlice";
import AllProductReducer from "./AllProducts/AllProductSlice";
import CartItemReducer from "./Cart/CartSlice";
import SignupReducer from "./Signup/SignupSlice";
import AllAddress from "./Address/AddressSlice";
import PlaceOrderReducer from "./Order/PlaceOrderSlice";
import ForgotPasswordReducer from "./ForgotPassword/ForgotPasswordSlice";
import AllProductsFiltersSlice from "./ProductFilters/ProductFiltersSlice";

const store = configureStore({
  reducer: {
    home: HomeReducer,
    login: SigninSlice,
    allproducts: AllProductReducer,
    cartitem: CartItemReducer,
    signup: SignupReducer,
    alladdress: AllAddress,
    placeorder: PlaceOrderReducer,
    forgotpassword: ForgotPasswordReducer,
    allproductsfilters: AllProductsFiltersSlice,
  },
});

export default store;
