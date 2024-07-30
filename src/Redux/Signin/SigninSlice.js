import { createSlice } from "@reduxjs/toolkit";
import {
    signIn,
    changePassword
} from "./SigninThunk";
import status from "./../Constants";

const SigninSlice = createSlice({
    name: "login",
    initialState: {
        loginData: {
            status: null,
        },
        changePassData:{
            status: null, 
        }

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending.toString(), (state, action) => {
                return {
                    ...state,
                    loginData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(signIn.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    loginData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(signIn.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    loginData: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(changePassword.pending.toString(), (state, action) => {
                return {
                    ...state,
                    changePassData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(changePassword.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    changePassData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(changePassword.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    changePassData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});


export default SigninSlice.reducer;
