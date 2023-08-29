import React, { useEffect, useRef, useState } from "react";
import { Select as AntdSelect, Spin } from "antd";
import { mockOptions, Option } from "./mockOption";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";

interface Props {
  fetchFn?: (search?: string) => Promise<Option[]>;
  defaultOptions?: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Select = ({ fetchFn, defaultOptions = mockOptions, placeholder = "Select for priority", onChange }: Props) => {
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const isMount = useRef(true);

  const debauncedFetcher = useDebouncedCallback(async (value) => {
    setOptions([]);
    const options = await fetchFn!(value);
    setOptions(options);
    setIsTyping(false);
  });

  const handlerOnChange = (value) => {
    console.log("onChange selected", value);
    if (onChange) {
      onChange(value);
    }
  };

  const onSearch = async (value) => {
    if (fetchFn) {
      setIsTyping(true);
      await debauncedFetcher(value);
    }
  };

  useEffect(() => {
    if (isMount.current) {
      if (fetchFn) {
        const fetchOptions = async () => {
          const options = await fetchFn();
          setOptions(options);
        };

        fetchOptions();
        isMount.current = false;
      }
    }
  }, [fetchFn]);

  return (
    <AntdSelect
      showSearch
      placeholder={placeholder}
      filterOption={!fetchFn}
      onChange={handlerOnChange}
      onSearch={onSearch}
      options={options}
      notFoundContent={isTyping ? <Spin size="small" data-testid="antd-spinner" /> : null}
    />
  );
};
