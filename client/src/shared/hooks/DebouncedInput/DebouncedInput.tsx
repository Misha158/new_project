import { useEffect, useState } from "react";

export const DebouncedInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === undefined) {
      // skip initial useEffect
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log("send request to server:", value);
      onChange(value);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [onChange, value]);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};
