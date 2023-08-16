import React, { useState } from "react";
import { Button } from "antd";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <div>count: {count}</div>
    </div>
  );
};
