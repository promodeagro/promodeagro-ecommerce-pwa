import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";

export const createFeedback = createAsyncThunk("createfeedback", async (params) => {
  try {
    let url = config.CREATE_FEEDBACK;
    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});
    