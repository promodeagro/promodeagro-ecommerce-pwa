import { createSlice } from "@reduxjs/toolkit";
import {
    allProducts,
    productDetails,
    fetchCategories
} from "./AllProductthunk";
import status from "./../Constants";

const AllProductsSlice = createSlice({
    name: "allproducts",
    initialState: {
        allProductsData: {
            status: null,
        },
        allCategories:{
            status:null
        },

        shopCategoryData: [],
        productCategoryData: [],
        prodducDetailsData: {},
        productDetailsData: {}

    },
    reducers: {
        productDetailsData: (state, action) => {

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
            }).addCase(productDetails.pending.toString(), (state, action) => {
                return {
                    ...state,
                    productDetailsData: {
                        status: status.IN_PROGRESS,
                    },
                };
            }).addCase(productDetails.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    productDetailsData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            }).addCase(productDetails.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    productDetailsData: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(fetchCategories.pending.toString(), (state, action) => {
                return {
                    ...state,
                    allCategories: {
                        status: status.IN_PROGRESS,
                    },
                };
            }).addCase(fetchCategories.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    allCategories: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            }).addCase(fetchCategories.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    allCategories: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});

export const { setShopByCategory, productCategories, productDetailsData } = AllProductsSlice.actions;
export default AllProductsSlice.reducer;
