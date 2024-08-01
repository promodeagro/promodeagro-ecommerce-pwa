import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService,preLoginService } from ".././../Services";

export const signIn = createAsyncThunk("login", async (params) => {
    try {
        let url = config.SIGN_IN;
        const response = await preLoginService.post(url, params);
        return response.data;
    } catch (error) {
        return error;
    }
});
// changePassword

export const changePassword = createAsyncThunk("changepassword", async (params) => {
    try {
        let url = config.CHANGE_PASSWORD;
        const response = await preLoginService.post(url, params);
        return response.data;
    } catch (error) {
        return error;
    }
});


export const deleteUser = createAsyncThunk("deleteUser", async (params) => {
    try {
        let url = config.DELETE_USER+`/${params?.userId}`;
        const response = await preLoginService.delete(url);
        return response.data;
    } catch (error) {
        return error;
    }
});