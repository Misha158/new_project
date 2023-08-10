import { act, renderHook } from "@testing-library/react-hooks";
import { useConfirm } from "./useConfirm";
import axios from "axios";

jest.mock("axios");

describe("useConfirm", () => {
  it("Should return loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useConfirm({ closeModal: () => {}, adNameLineItems: {} }));

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.onConfirm();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });
  it("Should return error", async () => {
    (axios.post as jest.Mock).mockRejectedValue("error");

    const { result, waitForNextUpdate } = renderHook(() => useConfirm({ closeModal: () => {}, adNameLineItems: {} }));

    expect(result.current.error).toBe(false);

    act(() => {
      result.current.onConfirm();
    });

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
  });
  it("Should return onCorfirm that call axios", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useConfirm({ closeModal: () => {}, adNameLineItems: {} }));

    act(() => {
      result.current.onConfirm();
    });

    await waitForNextUpdate();

    expect(axios.post).toHaveBeenCalled();
  });
});
