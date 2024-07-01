
import { createSlice } from "@reduxjs/toolkit";
import {
    addItemToCart,

} from "./CartThunk";
import status from "./../Constants";

const CartItemSlice = createSlice({
    name: "cartitems",
    initialState: {
        additems: {
            status: null,
        },


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

    },
});


export default CartItemSlice.reducer;
