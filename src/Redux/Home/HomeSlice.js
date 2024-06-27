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

    },
    reducers: {},
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

export default HomeSlice.reducer;
