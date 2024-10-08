import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const fetchHome = createAsyncThunk("home", async (userId) => {
  try {
    let url = config.HOME+`?userId=${userId}`;
    
    const response = await postLoginService.get(url);
    return {
      data:response.data,
      statusCode:response.status
    }

  } catch (error) {
    return {
      ...error.response.data,
      statusCode: error.response.status,
    };
  }
});
