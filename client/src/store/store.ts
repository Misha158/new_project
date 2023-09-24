import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { counterSlice } from "./slices/counterSlice";
import { postsSlice } from "./slices/postsSlice";
import { uploadsSlice } from "./slices/uploadsSlice";

const myMiddleware = (store) => (next) => (action) => {
  // console.log("Dispatching action:MISHAAAAAAAAAA", action);
  if (action.type === "counter/incrementByAmount") {
    action.payload = action.payload ? action.payload + 7 : 7;
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    posts: postsSlice.reducer,
    uploads: uploadsSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
