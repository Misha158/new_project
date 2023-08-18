import { useState } from "react";
import { Button } from "antd";

const TestComp = ({ text }: { text: string }) => {
  return <div>{text}</div>;
};

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
      <TestComp text={"1"} />
      {count && <div>Count: {count}</div>}
    </div>
  );
};
