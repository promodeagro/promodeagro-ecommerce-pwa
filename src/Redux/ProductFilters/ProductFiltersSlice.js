import { createSlice } from "@reduxjs/toolkit";
import { fetchGlobalSearchItems } from "./ProductFiltersThunk";
import status from "../Constants";

const AllProductsFiltersSlice = createSlice({
  name: "allproductsfilters",
  initialState: {
    globalSearchRes: { status: "", data: [] },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalSearchItems.pending.toString(), (state, action) => {
        return {
          ...state,
          globalSearchRes: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchGlobalSearchItems.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            globalSearchRes: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchGlobalSearchItems.rejected.toString(), (state, action) => {
        return {
          ...state,
          globalSearchRes: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default AllProductsFiltersSlice.reducer;
