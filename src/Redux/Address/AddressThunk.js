import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";

export const getAllAddress = createAsyncThunk("alladdress", async (params) => {
  try {
    let url = config.GET_ALL_ADDRESS + `/${params.userId}`;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

