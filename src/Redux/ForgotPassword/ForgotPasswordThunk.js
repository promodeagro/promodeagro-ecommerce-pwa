import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService, preLoginService } from ".././../Services";

export const forgotPassword = createAsyncThunk(
  "forgetpassword",
  async (params) => {
    try {
      let url = config.FORGOT_PASSWORD;
      const response = await preLoginService.post(url, params);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
