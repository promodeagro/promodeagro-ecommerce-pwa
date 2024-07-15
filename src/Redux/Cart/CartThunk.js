import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const addItemToCart = createAsyncThunk("additems", async (params) => {
  try {
    let url = config.ADD_ITEM;
    const response = await postLoginService.post(url, params);

    return response.data;
  } catch (error) {
    return error;
  }
});

export const updateItemToCart = createAsyncThunk(
  "updateitems",
  async (params) => {
    try {
      let url = config.UPDATE_ITEM;
      const response = await postLoginService.put(url, params);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteItemToCart = createAsyncThunk(
  "deleteitems",
  async (params) => {
    try {
      let url = config.DELETE_ITEM;
      const response = await postLoginService.delete(url, { data: params });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCartItems = createAsyncThunk("cartitems", async (params) => {
  try {
    let url = config.FETCH_CART_ITEMS + `/${params.userId}`;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});
