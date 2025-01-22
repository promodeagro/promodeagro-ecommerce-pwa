import { createSlice } from "@reduxjs/toolkit";
import status from "../Constants";
import { createFeedback } from "./FeedBackThunk";

const FeedBackSlice = createSlice({
  name: "FeedBack",
  initialState: {
    
    feedBackData: {
      status: null,
    }, 
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(createFeedback.pending.toString(), (state, action) => {
        return {
          ...state,
          feedBackData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(createFeedback.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          feedBackData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(createFeedback.rejected.toString(), (state, action) => {
        return {
          ...state,
          feedBackData: {
            status: status.FAILURE,
          },
        };
      })  
  },
});

 export default FeedBackSlice.reducer;
