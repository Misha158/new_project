import { renderHook, act } from "@testing-library/react-hooks";

import { useCounter } from "./useCounter";

describe("test", () => {
  it("should use counter", () => {
    const { result } = renderHook(() => useCounter({ id: 1 }));

    expect(result.current.count).toBe(0);
  });

  it("should use counter 2", async () => {
    const initialProps = { id: 1 };
    const updatedProps = { id: 2 };

    const { result, rerender } = renderHook((props) => useCounter(props), {
      initialProps: initialProps,
    });

    expect(result.current.count).toBe(0);

    rerender(updatedProps);

    // Wait for the next update to finish
    await act(async () => {
      expect(result.current.count).toBe(666);
    });
  });
});
