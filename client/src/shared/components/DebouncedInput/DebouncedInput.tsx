import { Input } from "antd";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";

interface Props {
  onChange: (value: string) => void;
}

export const DebouncedInput = ({ onChange }: Props) => {
  const debouncedFetcher = useDebouncedCallback((value) => onChange(value));

  return <Input onChange={(e) => debouncedFetcher(e.target.value)} />;
};
