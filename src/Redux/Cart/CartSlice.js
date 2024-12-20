import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  fetchCartItems,
  deleteItemToCart,
  updateItemToCart,
  fetchDeliverySlots,
  addListOfItemsToCartReq,
} from "./CartThunk";
import status from "./../Constants";
import { getNumberOfItemsOnChart } from "Services/localStorageCartService";

const CartItemSlice = createSlice({
  name: "cartitems",
  initialState: {
    additems: {
      status: null,
    },
    deleteItems: {
      status: null,
    },
    updateItems: {
      status: null,
    },
    cartItems: {
      status: null,
    },
    addListOfItemRes: {
      status: null,
    },
    deliverySlots: {
      data: [],
      status: null,
      error: null,
    },
    
    noOfcartItemsInLS: getNumberOfItemsOnChart(),
  },
  reducers: {
    // updateNoOfcartItemsInLS: (state, action) => {
    //   return {
    //     ...state,
    //     noOfcartItemsInLS: state.noOfcartItemsInLS
    //   }
    // }
    updateNoOfcartItemsInLS: (state, action) => {
      state.noOfcartItemsInLS = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending.toString(), (state, action) => {
        return {
          ...state,
          additems: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(addItemToCart.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          additems: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(addItemToCart.rejected.toString(), (state, action) => {
        return {
          ...state,
          additems: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(addListOfItemsToCartReq.pending.toString(), (state, action) => {
        return {
          ...state,
          addListOfItemRes: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        addListOfItemsToCartReq.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            addListOfItemRes: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(addListOfItemsToCartReq.rejected.toString(), (state, action) => {
        return {
          ...state,
          addListOfItemRes: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchCartItems.pending.toString(), (state, action) => {
        return {
          ...state,
          cartItems: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchCartItems.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          cartItems: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchCartItems.rejected.toString(), (state, action) => {
        return {
          ...state,
          cartItems: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(deleteItemToCart.pending.toString(), (state, action) => {
        return {
          ...state,
          deleteItems: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(deleteItemToCart.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          deleteItems: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(deleteItemToCart.rejected.toString(), (state, action) => {
        return {
          ...state,
          deleteItems: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(updateItemToCart.pending.toString(), (state, action) => {
        return {
          ...state,
          updateItems: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(updateItemToCart.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          updateItems: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(updateItemToCart.rejected.toString(), (state, action) => {
        return {
          ...state,
          updateItems: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchDeliverySlots.pending, (state) => {
        state.deliverySlots.status = "IN_PROGRESS";
        state.deliverySlots.error = null;
      })
      .addCase(fetchDeliverySlots.fulfilled, (state, { payload }) => {
        state.deliverySlots.status = "SUCCESS";
        state.deliverySlots.data = payload;
      })
      .addCase(fetchDeliverySlots.rejected, (state, action) => {
        state.deliverySlots.status = "FAILURE";
        state.deliverySlots.data = [];
        state.deliverySlots.error = action.error?.message || "Failed to fetch delivery slots.";
      });

  },
});
export const { updateNoOfcartItemsInLS } = CartItemSlice.actions;
export default CartItemSlice.reducer;
