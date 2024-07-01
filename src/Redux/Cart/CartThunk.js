import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const addItemToCart = createAsyncThunk("additems", async (params) => {
    try {
        let url = config.ADD_ITEM;
        const response = await postLoginService.post(url, params);
        return response.data;
    } catch (error) {
        return error;
    }
});
