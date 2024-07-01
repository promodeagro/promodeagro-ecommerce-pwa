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
