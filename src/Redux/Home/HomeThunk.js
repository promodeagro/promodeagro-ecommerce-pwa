import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const fetchHome = createAsyncThunk("home", async (params) => {
  try {
    let url = config.HOME;
    const response = await postLoginService.get(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});
