
import { createSlice } from "@reduxjs/toolkit";
import {
    addItemToCart,
    fetchCartItems,
    deleteItemToCart,
    updateItemToCart
} from "./CartThunk";
import status from "./../Constants";

const CartItemSlice = createSlice({
    name: "cartitems",
    initialState: {
        additems: {
            status: null,
        },
        deleteItems: {
            status: null,
        },
        updateItems: {
            status: null
        },
        cartItems: {
            status: null
        }


    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.pending.toString(), (state, action) => {
                return {
                    ...state,
                    additems: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(addItemToCart.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    additems: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(addItemToCart.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    additems: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(fetchCartItems.pending.toString(), (state, action) => {
                return {
                    ...state,
                    cartItems: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(fetchCartItems.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    cartItems: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(fetchCartItems.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    cartItems: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(deleteItemToCart.pending.toString(), (state, action) => {
                return {
                    ...state,
                    deleteItems: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(deleteItemToCart.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    deleteItems: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(deleteItemToCart.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    deleteItems: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(updateItemToCart.pending.toString(), (state, action) => {
                return {
                    ...state,
                    updateItems: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(updateItemToCart.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    updateItems: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(updateItemToCart.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    updateItems: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});


export default CartItemSlice.reducer;
