import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookDetailReducer from "./bookDetailSlice";
import bookReducer from "./bookSlice";
import favoriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: combineReducers({
    favorite: favoriteReducer,
    book: bookReducer,
    bookDetail: bookDetailReducer,
  }),
});

export default store;
