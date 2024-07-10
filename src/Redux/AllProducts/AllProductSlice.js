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

        shopCategoryData: [],
        productCategoryData: [],
        prodducDetailsData:{}

    },
    reducers: {
        productDetailsData : (state, action) => {
            
            state.prodducDetailsData = action.payload;
        },


        productCategories: (state, action) => {
            
            state.productCategoryData = action.payload;
        },

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

export const { setShopByCategory, productCategories ,productDetailsData} = AllProductsSlice.actions;
export default AllProductsSlice.reducer;
