import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";

export const allProductsFilters = createAsyncThunk(
  "productsfilters",
  async (params) => {
    try {
      let url = config.PRODUCTS_FILTERS;
      // console.log(params);
      if (params?.name) {
        url = `${url}?name=${params.name}`;
      }
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
