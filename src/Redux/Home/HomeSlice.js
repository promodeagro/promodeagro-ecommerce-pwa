import { createSlice } from "@reduxjs/toolkit";
import {
    fetchHome,
} from "./HomeThunk";
import status from "./../Constants";

const HomeSlice = createSlice({
    name: "home",
    initialState: {
        homeData: {
            status: null,
        },
        cartData: [],

    },
    reducers: {
        addDataInCart: (state, action) => {
            // Since cartData is an array, you should update it accordingly
            state.cartData = [...state.cartData, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHome.pending.toString(), (state, action) => {
                return {
                    ...state,
                    homeData: {
                        status: status.IN_PROGRESS,
                    },
                };
            })
            .addCase(fetchHome.fulfilled.toString(), (state, { payload }) => {
                return {
                    ...state,
                    homeData: {
                        status: status.SUCCESS,
                        data: payload,
                    },
                };
            })
            .addCase(fetchHome.rejected.toString(), (state, action) => {
                return {
                    ...state,
                    homeData: {
                        status: status.FAILURE,
                    },
                };
            })

    },
});

export const { addDataInCart } = HomeSlice.actions;
export default HomeSlice.reducer;
