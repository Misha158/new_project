import { useState, useEffect, useRef } from "react";

export const useCounter = ({ id }) => {
  const initialMountRef = useRef(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }

    setCount(666);
  }, [id]);

  return { count };
};
