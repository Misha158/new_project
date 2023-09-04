import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (userId, thunkAPI) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
});
