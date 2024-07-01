import { configureStore } from "@reduxjs/toolkit";
// import QuotationsReducer from "Redux-Store/Quotations/QuotationsSlice";
import HomeReducer from "./Home/HomeSlice";
import SigninSlice from "./Signin/SigninSlice";
import AllProductReducer from "./AllProducts/AllProductSlice";
import CartItemReducer from "./Cart/CartSlice"
const store = configureStore({
    reducer: {
        home: HomeReducer,
        login: SigninSlice,
        allproducts: AllProductReducer,
        cartitem: CartItemReducer
    },
});

export default store;
