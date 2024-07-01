import { configureStore } from "@reduxjs/toolkit";
// import QuotationsReducer from "Redux-Store/Quotations/QuotationsSlice";
import HomeReducer from "./Home/HomeSlice";
import SigninSlice from "./Signin/SigninSlice";

const store = configureStore({
    reducer: {
        home: HomeReducer,
        login: SigninSlice,

    },
});

export default store;
