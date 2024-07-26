import { createSlice } from "@reduxjs/toolkit";
import {
  allProducts,
  productDetails,
  fetchCategories,
  fetchFilteredProducts,
  fetchProductByCategory,
  fetchProductBySubCategory,
  setProductWishList,
  deleteProductWishList,
  fetchProductWishList,
} from "./AllProductthunk";
import status from "./../Constants";

const AllProductsSlice = createSlice({
  name: "allproducts",
  initialState: {
    allProductsData: {
      status: null,
    },
    allCategories: {
      status: null,
    },

    shopCategoryData: [],
    productCategoryData: [],
    prodducDetailsData: {},
    productDetailsData: {},
    filteredProductData: {
      status: null,
    },
    productByCategoryData: {
      status: null,
    },
    productBySubCategoryData: {
      status: null,
    },
    setBookmarksData: {
      status: null,
    },
    deleteBookMarkData: {
      status: null,
    },
    bookMarksData: {
      status: null,
    },
  },
  reducers: {
    productDetailsData: (state, action) => {
      state.prodducDetailsData = action.payload;
    },

    productCategories: (state, action) => {
      state.productCategoryData = action.payload;
    },

    setShopByCategory: (state, action) => {
      state.shopCategoryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending.toString(), (state, action) => {
        return {
          ...state,
          allProductsData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(allProducts.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          allProductsData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(allProducts.rejected.toString(), (state, action) => {
        return {
          ...state,
          allProductsData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(productDetails.pending.toString(), (state, action) => {
        return {
          ...state,
          productDetailsData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(productDetails.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          productDetailsData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(productDetails.rejected.toString(), (state, action) => {
        return {
          ...state,
          productDetailsData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchCategories.pending.toString(), (state, action) => {
        return {
          ...state,
          allCategories: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchCategories.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          allCategories: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchCategories.rejected.toString(), (state, action) => {
        return {
          ...state,
          allCategories: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchFilteredProducts.pending.toString(), (state, action) => {
        return {
          ...state,
          filteredProductData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchFilteredProducts.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            filteredProductData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchFilteredProducts.rejected.toString(), (state, action) => {
        return {
          ...state,
          filteredProductData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchProductByCategory.pending.toString(), (state, action) => {
        return {
          ...state,
          productByCategoryData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchProductByCategory.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            productByCategoryData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchProductByCategory.rejected.toString(), (state, action) => {
        return {
          ...state,
          productByCategoryData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(
        fetchProductBySubCategory.pending.toString(),
        (state, action) => {
          return {
            ...state,
            productBySubCategoryData: {
              status: status.IN_PROGRESS,
            },
          };
        }
      )
      .addCase(
        fetchProductBySubCategory.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            productBySubCategoryData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(
        fetchProductBySubCategory.rejected.toString(),
        (state, action) => {
          return {
            ...state,
            productBySubCategoryData: {
              status: status.FAILURE,
            },
          };
        }
      )
      .addCase(setProductWishList.pending.toString(), (state, action) => {
        return {
          ...state,
          setBookmarksData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        setProductWishList.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            setBookmarksData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(setProductWishList.rejected.toString(), (state, action) => {
        return {
          ...state,
          setBookmarksData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(deleteProductWishList.pending.toString(), (state, action) => {
        return {
          ...state,
          setBookmarksData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        deleteProductWishList.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            setBookmarksData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(deleteProductWishList.rejected.toString(), (state, action) => {
        return {
          ...state,
          setBookmarksData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchProductWishList.pending.toString(), (state, action) => {
        return {
          ...state,
          setBookmarksData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchProductWishList.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            setBookmarksData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchProductWishList.rejected.toString(), (state, action) => {
        return {
          ...state,
          setBookmarksData: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export const { setShopByCategory, productCategories, productDetailsData } =
  AllProductsSlice.actions;
export default AllProductsSlice.reducer;
