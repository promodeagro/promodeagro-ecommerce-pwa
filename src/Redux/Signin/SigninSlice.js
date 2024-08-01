import { createSlice } from "@reduxjs/toolkit";
import {
    signIn,
    changePassword,
    deleteUser,
    updatePersonalDetails,
    fetchPersonalDetails
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
        },
        deleteUserData:{
            status:null
        },
        personalDetailsData:{
            status:false
        },
        updatePersonalDetailsData:{
            status:false
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
            .addCase(deleteUser.pending.toString(), (state, action) => {
                return {
                    ...state,
                    deleteUserData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(deleteUser.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    deleteUserData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(deleteUser.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    deleteUserData: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(updatePersonalDetails.pending.toString(), (state, action) => {
                return {
                    ...state,
                    updatePersonalDetailsData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(updatePersonalDetails.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    updatePersonalDetailsData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(updatePersonalDetails.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    updatePersonalDetailsData: {
                        status: status.FAILURE,
                    },
                };
            })
            .addCase(fetchPersonalDetails.pending.toString(), (state, action) => {
                return {
                    ...state,
                    personalDetailsData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(fetchPersonalDetails.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    personalDetailsData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(fetchPersonalDetails.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    personalDetailsData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});


export default SigninSlice.reducer;
