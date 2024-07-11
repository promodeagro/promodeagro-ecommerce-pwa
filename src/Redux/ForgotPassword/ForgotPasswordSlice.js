import { createSlice } from "@reduxjs/toolkit";
import {
    forgotPassword,
} from "./ForgotPasswordThunk";
import status from "./../Constants";

const ForgotPasswordSlice = createSlice({
    name: "forgotpassword",
    initialState: {
        forgotPassData: {
            status: null,
        },

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending.toString(), (state, action) => {
                return {
                    ...state,
                    forgotPassData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(forgotPassword.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    forgotPassData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(forgotPassword.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    forgotPassData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});


export default ForgotPasswordSlice.reducer;
