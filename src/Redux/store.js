import { configureStore } from "@reduxjs/toolkit";
// import QuotationsReducer from "Redux-Store/Quotations/QuotationsSlice";
import HomeReducer from "./Home/HomeSlice";

const store = configureStore({
    reducer: {
        home: HomeReducer

    },
});

export default store;
