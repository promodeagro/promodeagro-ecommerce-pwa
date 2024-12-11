import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";


export const placeOrder = createAsyncThunk("placeorder", async (params) => {
  try {
    let url = config.PLACE_ORDER;
    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const fetchAllorders = createAsyncThunk("allorders", async (userId) => {
  try {
    let url = config.PLACE_ORDER + `/${userId}`;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const fetchOrderById = createAsyncThunk("orderbyid", async (orderId) => {
  try {
    let url = config.PLACE_ORDER + `/${orderId}`;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const fetchAvailableDeliverySlot = createAsyncThunk(
  "deliveryslot",
  async (day) => {
    try {
      
      let url = config.DELIVERY_SLOT + `?day=${day}`;
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);


export const cancleOrder = createAsyncThunk("cancleorder", async (params) => {
  try {
    let url = config.CANCLE_ORDER;
    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});