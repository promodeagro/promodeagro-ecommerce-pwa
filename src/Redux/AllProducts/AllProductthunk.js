import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const allProducts = createAsyncThunk("products", async (params) => {
  try {
    let url = config.ALL_PRODUCTS;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const productDetails = createAsyncThunk("productsdetails", async (productId) => {
  try {
    let url = config.ALL_PRODUCTS + `/${productId}`;
    
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});
