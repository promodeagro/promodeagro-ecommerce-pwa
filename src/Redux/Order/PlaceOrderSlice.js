import { createSlice } from "@reduxjs/toolkit";
import {
  placeOrder,
  fetchAllorders,
  fetchOrderById,
  fetchAvailableDeliverySlot,
  cancleOrder,
} from "./PlaceOrderThunk";
import status from "../Constants";

const PlaceOrderSlice = createSlice({
  name: "placeorder",
  initialState: {
    placeOrderData: {
      status: null,
    },
    allOrdersData: {
      status: null,
    },
    orderByIdData: {
      status: null,
    },
    deliverySlotData: {
      status: false,
    },
    cancelOrderData: {
      status: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending.toString(), (state, action) => {
        return {
          ...state,
          placeOrderData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(placeOrder.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          placeOrderData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(placeOrder.rejected.toString(), (state, action) => {
        return {
          ...state,
          placeOrderData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchAllorders.pending.toString(), (state, action) => {
        return {
          ...state,
          allOrdersData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchAllorders.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          allOrdersData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchAllorders.rejected.toString(), (state, action) => {
        return {
          ...state,
          allOrdersData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchOrderById.pending.toString(), (state, action) => {
        return {
          ...state,
          orderByIdData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchOrderById.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          orderByIdData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchOrderById.rejected.toString(), (state, action) => {
        return {
          ...state,
          orderByIdData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(
        fetchAvailableDeliverySlot.pending.toString(),
        (state, action) => {
          return {
            ...state,
            deliverySlotData: {
              status: status.IN_PROGRESS,
            },
          };
        }
      )
      .addCase(
        fetchAvailableDeliverySlot.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            deliverySlotData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(
        fetchAvailableDeliverySlot.rejected.toString(),
        (state, action) => {
          return {
            ...state,
            deliverySlotData: {
              status: status.FAILURE,
            },
          };
        }
      )
      .addCase(cancleOrder.pending.toString(), (state, action) => {
        return {
          ...state,
          cancelOrderData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(cancleOrder.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          cancelOrderData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(cancleOrder.rejected.toString(), (state, action) => {
        return {
          ...state,
          cancelOrderData: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default PlaceOrderSlice.reducer;
