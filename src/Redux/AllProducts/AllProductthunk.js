import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const allProducts = createAsyncThunk("products", async (userId) => {
  try {
    let url = config.ALL_PRODUCTS + `?userId=${userId}`;;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const productDetails = createAsyncThunk("productsdetails", async ({ productId, userId }) => {
  try {
    let url = config.ALL_PRODUCTS + `/${productId}?userId=${userId}`;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});



export const fetchCategories = createAsyncThunk("category", async () => {
  try {
    let url = config.CATEGOREIS;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});