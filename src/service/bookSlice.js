import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../apiService";

const initialState = {
  books: [],
  status: "idle",
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (pageNum, limit) => {
    const response = await apiService.get(
      `/books?_page=${pageNum}&_limit=${limit}`
    );
    return response.data;
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (text) => {
    const response = await apiService.get(`/books?q=${text}`);
    console.log("search boooks", response.data);
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(searchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
