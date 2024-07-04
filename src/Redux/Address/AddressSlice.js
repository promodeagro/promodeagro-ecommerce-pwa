import { createSlice } from "@reduxjs/toolkit";
import { getAllAddress } from "./AddressThunk";
import status from "../Constants";

const AddressSlice = createSlice({
  name: "alladdress",
  initialState: {
    allAddress: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddress.toString(), (state, action) => {
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
      });
  },
});

export default AddressSlice.reducer;
