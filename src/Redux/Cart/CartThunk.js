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

export const fetchCartItems = createAsyncThunk("cartitems", async (params, { rejectWithValue }) => {
  try {
    // console.log("📡 Using addressId:", addressId);

    const url = `${config.FETCH_CART_ITEMS}?userId=${params.userId}&addressId=${params.userId}`;
    const response = await postLoginService.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return rejectWithValue(error.message || "Failed to fetch cart items");
  }
});

export const addListOfItemsToCartReq = createAsyncThunk(
  "addListOfItemsToCartReq",
  async (params) => {
    try {
      let url = config.ADDLISTOFITEMS;
      const response = await postLoginService.post(url, params);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);


export const fetchDeliverySlots = createAsyncThunk(
  "fetchDeliverySlots",
  async ({ zipCode }) => {
    try {
      // Assuming URL format includes both zipCode and selectedDay (if needed)
      let url = `${config.DELIVERY_SLOTS}/${zipCode}`; // Adjust URL if required
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching delivery slots:", error); // Optional logging for debugging
      return error;
    }
  }
);
