import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../apiService";

const initialState = {
  bookDetail: {},
  status: "idle",
};

export const getBookDetail = createAsyncThunk(
  "bookDetail/getBookDetail",
  async (bookId) => {
    const response = await apiService.get(
      `/books/${bookId}`
    );
    return response.data;
  }
);

export const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.book = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default bookDetailSlice.reducer;
