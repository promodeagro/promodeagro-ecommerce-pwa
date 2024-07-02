import { createSlice } from "@reduxjs/toolkit";
import {
    signUp,
} from "./SignupThunk";
import status from "./../Constants";

const SignupSlice = createSlice({
    name: "login",
    initialState: {
        signupData: {
            status: null,
        },

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending.toString(), (state, action) => {
                return {
                    ...state,
                    signupData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(signUp.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    signupData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(signUp.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    signupData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});


export default SignupSlice.reducer;
