import React, { useEffect } from "react";

export const useDebounceValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// HOW TO USE
// 1.   const debouncedSearchValue = useDebounceValue(searchValue, 1000);

// 2.
// useEffect(() => {
//   makeRequestWith(debouncedSearchValue);
// }, [debouncedSearchValue]);

// Another solution with debaunce lodash and useCallback

// import { debounce } from "lodash";
// const fetchLineItems = useCallback(
//     debounce(async (searchValue: string) => {
//       const { data } = await axios.get(`http://localhost:3000/advertisement/lineItems?search=${searchValue}`);
//       setFilteredLineItems(data);
//     }, 2000),
//     []
// );

// const onSearchFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   setValue(event.target.value);
//   fetchLineItems(event.target.value);
// };
