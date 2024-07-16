import { createSlice } from "@reduxjs/toolkit";
import { allProductsFilters } from "./ProductFiltersThunk";
import status from "../Constants";

const AllProductsFiltersSlice = createSlice({
  name: "allproductsfilters",
  initialState: {
    allProductsFiltersData: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProductsFilters.pending.toString(), (state, action) => {
        return {
          ...state,
          allProductsFiltersData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        allProductsFilters.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            allProductsFiltersData: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(allProductsFilters.rejected.toString(), (state, action) => {
        return {
          ...state,
          allProductsFiltersData: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default AllProductsFiltersSlice.reducer;
