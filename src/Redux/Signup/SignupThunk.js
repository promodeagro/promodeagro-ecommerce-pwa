import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const signUp = createAsyncThunk("register", async (params) => {
  try {
    let url = config.SIGN_UP;
    const response = await postLoginService.get(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});
