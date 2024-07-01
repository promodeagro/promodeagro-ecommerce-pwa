import { configureStore } from "@reduxjs/toolkit";
// import QuotationsReducer from "Redux-Store/Quotations/QuotationsSlice";
import HomeReducer from "./Home/HomeSlice";
import SigninSlice from "./Signin/SigninSlice";
import AllProductReducer from "./AllProducts/AllProductSlice";
const store = configureStore({
    reducer: {
        home: HomeReducer,
        login: SigninSlice,
        allproducts: AllProductReducer
    },
});

export default store;
