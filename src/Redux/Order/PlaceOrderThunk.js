import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";

export const placeOrder = createAsyncThunk("placeorder", async (params) => {
  try {
    let url = config.PLACE_ORDER;
    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});
