import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { decrement, increment, incrementByAmount } from "../../../store/slices/counterSlice";
import { Button } from "antd";

export const ReduxCounter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>incrementByAmount</Button>
      <div>Redux count: {count}</div>
    </div>
  );
  // omit rendering logic
};
