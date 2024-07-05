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

export const postAddress = createAsyncThunk("postaddress", async (params) => {
  try {
    let url = config.ADD_ADDRESS;
    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteAddress = createAsyncThunk("deletetaddress", async (params) => {
  try {
    let url = config.DELETE_ADDRESS;
    const response = await postLoginService.delete(url, { data: params });
    return response.data;
  } catch (error) {
    return error;
  }
});

export const updateAddress = createAsyncThunk("updateaddress", async (params) => {
  try {
    let url = config.UPDATE_ADDRESS;
    const response = await postLoginService.put(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});
