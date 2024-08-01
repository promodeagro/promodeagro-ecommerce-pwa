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
  fetchProducReview,
  fetchTopSellingProducts,
  fetchToSellingCategories,
  fetchAllOffers,
  addProductReview
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
    productReviewData: {
      status: null,
    },
    topSellingProductsData: {
      status: null,
    },
    topSellingCategoriesData:{
      status:null
    },
    allOffersData:{
      status:null
    },
    addProductReviewData:{
      status:null
    }
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
          deleteBookMarkData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        deleteProductWishList.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            deleteBookMarkData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(deleteProductWishList.rejected.toString(), (state, action) => {
        return {
          ...state,
          deleteBookMarkData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchProductWishList.pending.toString(), (state, action) => {
        return {
          ...state,
          bookMarksData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchProductWishList.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            bookMarksData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchProductWishList.rejected.toString(), (state, action) => {
        return {
          ...state,
          bookMarksData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchTopSellingProducts.pending.toString(), (state, action) => {
        return {
          ...state,
          topSellingProductsData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchTopSellingProducts.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            topSellingProductsData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchTopSellingProducts.rejected.toString(), (state, action) => {
        return {
          ...state,
          topSellingProductsData: {
            status: status.FAILURE,
          },
        };
      })

      .addCase(fetchToSellingCategories.pending.toString(), (state, action) => {
        return {
          ...state,
          topSellingCategoriesData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchToSellingCategories.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            topSellingCategoriesData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchToSellingCategories.rejected.toString(), (state, action) => {
        return {
          ...state,
          topSellingCategoriesData: {
            status: status.FAILURE,
          },
        };
      })

      .addCase(fetchAllOffers.pending.toString(), (state, action) => {
        return {
          ...state,
          allOffersData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchAllOffers.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            allOffersData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchAllOffers.rejected.toString(), (state, action) => {
        return {
          ...state,
          allOffersData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchProducReview.pending.toString(), (state, action) => {
        return {
          ...state,
          productReviewData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchProducReview.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            productReviewData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchProducReview.rejected.toString(), (state, action) => {
        return {
          ...state,
          productReviewData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(addProductReview.pending.toString(), (state, action) => {
        return {
          ...state,
          addProductReviewData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        addProductReview.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            addProductReviewData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(addProductReview.rejected.toString(), (state, action) => {
        return {
          ...state,
          addProductReviewData: {
            status: status.FAILURE,
          },
        };
      })
  },
});

export const { setShopByCategory, productCategories, productDetailsData } =
  AllProductsSlice.actions;
export default AllProductsSlice.reducer;
