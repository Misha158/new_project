import React, { useEffect, useRef, useState } from "react";
import { Select as AntdSelect, Spin } from "antd";
import { mockOptions, Option } from "./mockOption";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";

interface Props {
  fetchFn?: (search?: string) => Promise<Option[]>;
  defaultOptions?: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  label?: string;
  width?: number;
}

/** Spare function for passing into this component to get options from BE */
// const fetchFn = async (search: string) => {
//   const { data } = await axios.get("/options", {
//     params: {
//       search: search,
//     },
//   });
//
//   return data;
// };

export const Select = ({ fetchFn, onChange, defaultOptions = mockOptions, placeholder = "Select for priority", label, width = 100 }: Props) => {
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
    <>
      {label && <div>{label}</div>}
      <AntdSelect
        showSearch
        placeholder={placeholder}
        filterOption={!fetchFn}
        onChange={handlerOnChange}
        onSearch={onSearch}
        options={options}
        notFoundContent={isTyping ? <Spin size="small" data-testid="antd-spinner" /> : null}
        style={{ width }}
        allowClear
      />
    </>
  );
};
