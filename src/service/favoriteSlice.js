import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  favorites: [],
  status: "idle",
};

export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (book) => {
    console.log(book.id, "add favor");
    const response = await apiService.post("/favorites", book);
    toast.success("The book has been added to the reading list!");
    return response.data;
  }
);

export const getFavorites = createAsyncThunk(
  "favorite/getFavorites",
  async () => {
    const response = await apiService.get("/favorites");
    return response.data;
  }
);

export const removeFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async (bookId) => {
    console.log(bookId, "remove this book");
    const response = await apiService.delete(`/favorites/${bookId}`);
    toast.success("The book has been removed");
    return response.data;
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      });

    builder
      .addCase(getFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(removeFavorite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = "idle";
        // let id = state.favorites.findIndex(
        //   (item) => item.id === action.payload
        // );
        let arr = state.favorites.fliter((item) => item.id !== action.payload);
        state.favorites = arr;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(state.error);
      });
  },
});

export default favoriteSlice.reducer;
