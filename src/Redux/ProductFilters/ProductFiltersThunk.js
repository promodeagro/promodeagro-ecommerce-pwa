import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";

export const fetchGlobalSearchItems = createAsyncThunk(
  "search/fetchGlobalSearchItems",
  async (params) => {
    try {
      let url = config.GLOBAL_SEARCH;
      const response = await postLoginService.get(url, { params });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
