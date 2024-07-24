import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";

export const allProducts = createAsyncThunk("products", async (userId) => {
  try {
    let url = config.ALL_PRODUCTS + `?userId=${userId}`;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const productDetails = createAsyncThunk(
  "productsdetails",
  async ({ productId, userId }) => {
    try {
      let url = config.ALL_PRODUCTS + `/${productId}?userId=${userId}`;
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCategories = createAsyncThunk("category", async () => {
  try {
    let url = config.CATEGOREIS;
    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const fetchProductByCategory = createAsyncThunk(
  "productcategory",
  async (category, userId) => {
    try {
      let url =
        config.PRODUCT_BY_CATEGORY + `?category=${category}&userId=${userId}`;
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchProductBySubCategory = createAsyncThunk(
  "subcategory",
  async (params) => {
    try {
      let url =
        config.PRODUCT_BY_SUBCATEGORY +
        `?subcategory=${params?.subcategory}&userId=${params?.userId}`;
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "filteredproducts",
  async (params) => {
    try {
      let url =
        config.FILTERED_PRODUCTS +
        `?minPrice=${params?.minPrice}&maxPrice=${params?.maxPrice}&discounts=upto`;
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
