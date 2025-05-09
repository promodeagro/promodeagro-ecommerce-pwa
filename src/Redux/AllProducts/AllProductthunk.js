import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../Views/Config";
import { postLoginService } from ".././../Services";
import { loginDetails } from "Views/Utills/helperFunctions";
export const allProducts = createAsyncThunk("products", async (params) => {
  try {
    let url = config.ALL_PRODUCTS;

    const response = await postLoginService.get(url, {
      params,
    });

    return { data: response.data, statusCode: response.status };
  } catch (error) {
    return {
      ...error.response.data,
      statusCode: error.response.status,
    };
  }
});

export const productDetails = createAsyncThunk(
  "productsdetails",
  async ({ productId, userId }) => {
    try {
      let url = config.PRODUCTS_DETAIL +  `?groupId=${productId}&userId=${userId}`;
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
    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      ...error.response.data,
      statusCode: error.response.status,
    };
  }
});

export const fetchProductByCategory = createAsyncThunk(
  "productcategory",
  async (params) => {
    try {
      let url = config.PRODUCT_BY_CATEGORY;
      const response = await postLoginService.get(url, { params });
      return { data: response.data, statusCode: response.status };
    } catch (error) {
      return {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
  }
);

export const fetchProductBySubCategory = createAsyncThunk(
  "subcategory",
  async (params) => {
    try {
      let url = config.PRODUCT_BY_SUBCATEGORY;

      const response = await postLoginService.get(url, { params });
      return { data: response.data, statusCode: response.status };
    } catch (error) {
      return {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "filteredproducts",
  async (params) => {
    try {
      let url = config.FILTERED_PRODUCTS;
      const response = await postLoginService.get(url, { params });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const setProductWishList = createAsyncThunk(
  "setwishlist",
  async (params) => {
    try {
      let url = config.ADD_PRODUCT_WISHLIST;

      const response = await postLoginService.post(url, params);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const saveForLater = createAsyncThunk("saveforlater", async (params) => {
  try {
    let url = config.SAVE_FOR_LATER;

    const response = await postLoginService.post(url, params);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteProductWishList = createAsyncThunk(
  "deletewishlist",
  async (productId) => {
    try {
      const userId = loginDetails()?.userId;
      let url =
        config.DELETE_PRODUCT_WISHLIST +
        `?userId=${userId}&productId=${productId}`;
      const response = await postLoginService.delete(url);
      return {
        data:response.data,
        statusCode:response.status
      }
      
    } catch (error) {
      return {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
  }
);

export const fetchProductWishList = createAsyncThunk(
  "fetchwishlist",
  async (params) => {
    try {
      const userId = loginDetails()?.userId;

      let url = config.GET_PRODUCT_WISHLIST;

      const response = await postLoginService.get(url, { params });
      return {
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
  }
);

export const fetchProducReview = createAsyncThunk(
  "productreview",
  async (productId) => {
    try {
      let url = config.GET_PRODUCT_REIVEW + `/${productId}`;

      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchToSellingCategories = createAsyncThunk(
  "topsellingcategories",
  async (productId) => {
    try {
      const userId = loginDetails()?.userId;

      let url = config.GET_TOP_SELLING_CATEGOREIS;

      const response = await postLoginService.get(url);
      return {
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
  }
);

export const fetchTopSellingProducts = createAsyncThunk(
  "topsellingproducts",
  async (params) => {
    try {
      const userId = loginDetails()?.userId;
      let url = config.TOP_SELLING_PRODUCTS;

      const response = await postLoginService.get(url, { params });
      return {
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
  }
);

export const fetchAllOffers = createAsyncThunk("alloffers", async (params) => {
  try {
    let url = config.GET_ALL_OFFERS;

    const response = await postLoginService.get(url);
    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      ...error.response.data,
      statusCode: error.response.status,
    };
  }
});

export const addProductReview = createAsyncThunk(
  "addreview",
  async (params) => {
    try {
      let url = config.ADD_PRODUCT_REVIEW;

      const response = await postLoginService.post(url, params);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllProductWithCategory = createAsyncThunk(
  "allProductWithCategory",
  async (params) => {
    try {
      let url = config.All_PRODUCT_WITH_CATEGORY;

      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
