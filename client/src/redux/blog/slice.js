import { createSlice } from "@reduxjs/toolkit";
import { LS_KEYS } from "../../utils/constants";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogs: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getBlogsSuccess: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    getBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      return state;
    },
  },
});
