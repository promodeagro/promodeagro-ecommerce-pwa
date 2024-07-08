import { createSlice } from "@reduxjs/toolkit";
import {
    placeOrder,
} from "./PlaceOrderThunk";
import status from "../Constants";

const PlaceOrderSlice = createSlice({
    name: "placeorder",
    initialState: {
        placeOrderData: {
            status: null,
        },
        

    },
    reducers: {
    
     
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending.toString(), (state, action) => {
                return {
                    ...state,
                    placeOrderData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(placeOrder.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    placeOrderData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(placeOrder.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    placeOrderData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});

export default PlaceOrderSlice.reducer;
