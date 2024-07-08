import { configureStore } from "@reduxjs/toolkit";
import HomeReducer from "./Home/HomeSlice";
import SigninSlice from "./Signin/SigninSlice";
import AllProductReducer from "./AllProducts/AllProductSlice";
import CartItemReducer from "./Cart/CartSlice";
import SignupReducer from "./Signup/SignupSlice";
import AllAddress from "./Address/AddressSlice";
import PlaceOrderReducer from "./Order/PlaceOrderSlice"
const store = configureStore({
  reducer: {
    home: HomeReducer,
    login: SigninSlice,
    allproducts: AllProductReducer,
    cartitem: CartItemReducer,
    signup: SignupReducer,
    alladdress: AllAddress,
    placeorder:PlaceOrderReducer

  },
});

export default store;
