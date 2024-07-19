import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAddress,
  postAddress,
  deleteAddress,
  updateAddress,
  setDefaultAddress,
  fetchDefaultAddress
} from "./AddressThunk";
import status from "../Constants";

const AddressSlice = createSlice({
  name: "alladdress",
  initialState: {
    allAddress: {
      status: null,
    },
    postAddress: {
      status: null,
    },
    deleteAddress: {
      status: null,
    },
    updateAddress: {
      status: null,
    },
    defaultAddressData:{
      status: null,
    },
    setDefaultAddressData:{
      status: null,
    },
    selectedAddressData: null,
  },
  reducers: {
    setSelectedAdd: (state, action) => {
      state.selectedAddressData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddress.pending.toString(), (state, action) => {
        return {
          ...state,
          allAddress: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(getAllAddress.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          allAddress: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(getAllAddress.rejected.toString(), (state, action) => {
        return {
          ...state,
          allAddress: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(postAddress.pending.toString(), (state, action) => {
        return {
          ...state,
          postAddress: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(postAddress.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          postAddress: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(postAddress.rejected.toString(), (state, action) => {
        return {
          ...state,
          postAddress: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(deleteAddress.pending.toString(), (state, action) => {
        return {
          ...state,
          deleteAddress: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(deleteAddress.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          deleteAddress: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(deleteAddress.rejected.toString(), (state, action) => {
        return {
          ...state,
          deleteAddress: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(updateAddress.pending.toString(), (state, action) => {
        return {
          ...state,
          updateAddress: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(updateAddress.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          updateAddress: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(updateAddress.rejected.toString(), (state, action) => {
        return {
          ...state,
          updateAddress: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(setDefaultAddress.pending.toString(), (state, action) => {
        return {
          ...state,
          setDefaultAddressData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(setDefaultAddress.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          setDefaultAddressData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(setDefaultAddress.rejected.toString(), (state, action) => {
        return {
          ...state,
          setDefaultAddressData: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(fetchDefaultAddress.pending.toString(), (state, action) => {
        return {
          ...state,
          defaultAddressData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchDefaultAddress.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          defaultAddressData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchDefaultAddress.rejected.toString(), (state, action) => {
        return {
          ...state,
          defaultAddressData: {
            status: status.FAILURE,
          },
        };
      })
  },
});

export const { setSelectedAdd } = AddressSlice.actions;
export default AddressSlice.reducer;
