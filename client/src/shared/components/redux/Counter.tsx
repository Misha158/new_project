import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { decrement, increment } from "../../../store/slices/counterSlice";

export const Counter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // omit rendering logic
};
