import { createSlice } from "@reduxjs/toolkit";
import {
    allProducts,

} from "./AllProductthunk";
import status from "./../Constants";

const AllProductsSlice = createSlice({
    name: "allproducts",
    initialState: {
        allProductsData: {
            status: null,
        },

        shopCategoryData: []


    },
    reducers: {



        setShopByCategory: (state, action) => {
            state.shopCategoryData = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending.toString(), (state, action) => {
                return {
                    ...state,
                    allProductsData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(allProducts.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    allProductsData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(allProducts.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    allProductsData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});

export const { setShopByCategory } = AllProductsSlice.actions;
export default AllProductsSlice.reducer;
