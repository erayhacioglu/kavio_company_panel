import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "./slices/groupSlice.jsx";

export const store = configureStore({
  reducer: {
    groups: groupReducer,
  },
});

export default store;
