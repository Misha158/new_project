import { act, renderHook, waitFor } from "@testing-library/react";
import { useConfirm } from "./useConfirm";
import axios from "axios";

jest.mock("axios");

describe("useConfirm", () => {
  it("Should return loading", async () => {
    const { result } = renderHook(() => useConfirm({ closeModal: () => {}, adNameLineItems: {} }));

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.onConfirm();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("Should return error", async () => {
    (axios.post as jest.Mock).mockRejectedValue("error");

    const { result } = renderHook(() => useConfirm({ closeModal: () => {}, adNameLineItems: {} }));

    expect(result.current.error).toBe(false);

    act(() => {
      result.current.onConfirm();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(true);
    });
  });
  it("Should return onCorfirm that call axios", async () => {
    const { result } = renderHook(() => useConfirm({ closeModal: () => {}, adNameLineItems: {} }));

    act(() => {
      result.current.onConfirm();
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
