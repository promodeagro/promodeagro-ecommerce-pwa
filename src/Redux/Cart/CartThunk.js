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
    // Get addressId from localStorage
    let addressId = localStorage.getItem("address")?.trim();

    // If addressId is not found, check for defaultAddress in localStorage
    if (!addressId) {
      const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress") || "{}");
      addressId = defaultAddress?.addressId;
    }

    // If still no valid addressId, throw an error
    if (!addressId) {
      throw new Error("No valid addressId found");
    }

    const url = `${config.FETCH_CART_ITEMS}?userId=${params.userId}&addressId=${addressId}`;
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
