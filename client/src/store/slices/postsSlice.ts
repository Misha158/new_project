import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";

interface Post {
  id: number;
  title: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // Add user to the state array
      state.posts = action.payload;
    });
  },
});
