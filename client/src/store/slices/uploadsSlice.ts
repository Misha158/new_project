import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadsState {
  avatarUrl: string;
}

const initialState: UploadsState = {
  avatarUrl: "",
};

export const uploadsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    upload: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    },
  },
});

export const { upload } = uploadsSlice.actions;
