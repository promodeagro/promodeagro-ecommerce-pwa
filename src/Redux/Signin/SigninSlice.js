import { createSlice } from "@reduxjs/toolkit";
import {
    signIn,
    changePassword,
    deleteUser,
    updatePersonalDetails,
    fetchPersonalDetails,
    validateOtp
} from "./SigninThunk";
import status from "./../Constants";

const initialState = {
    loginData: {
        status: '',
        data: null
    },
    changePassData: {
        status: null,
    },
    deleteUserData: {
        status: null
    },
    personalDetailsData: {
        status: null
    },
    updatePersonalDetailsData: {
        status: null
    },
    validateOtpRes: {
        status: '',
        data: null
    }
};

const SigninSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        resetLogin: (state) => {
            state.loginData = initialState.loginData;
            state.validateOtpRes = initialState.validateOtpRes;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loginData.status = status.IN_PROGRESS;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loginData.status = status.SUCCESS;
                state.loginData.data = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loginData.status = status.ERROR;
                state.loginData.data = action.payload;
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

            .addCase(validateOtp.pending, (state) => {
                state.validateOtpRes.status = status.IN_PROGRESS;
            })
            .addCase(validateOtp.fulfilled, (state, action) => {
                state.validateOtpRes.status = status.SUCCESS;
                state.validateOtpRes.data = action.payload;
            })
            .addCase(validateOtp.rejected, (state, action) => {
                state.validateOtpRes.status = status.ERROR;
                state.validateOtpRes.data = action.payload;
            })
    },
});

export const { resetLogin } = SigninSlice.actions;
export default SigninSlice.reducer;
