import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from "../../Services";
import { ErrorMessages } from "Views/Utills/helperFunctions";


export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { dispatch }) => {
    try {
      const response = await postLoginService.post(config.PLACE_ORDER, orderData);
      
      // Only show success message if we have an orderId
      if (response.data?.statuscode === 200 && response.data?.orderId) {
        ErrorMessages.success(response.data?.message, {
          toastId: `order-${response.data.orderId}` // Use orderId to make toast unique
        });
      }
      
      return response.data;
    } catch (error) {
      return error;
    }
  }
);



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
    let url = config.ORDER_BY_ID + `/${orderId}`;
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

export const cancleOrderRequest = createAsyncThunk("cancleorderrequest", async (params) => {
  try {
    let url = config.CANCLE_ORDER_REQUEST;
    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});