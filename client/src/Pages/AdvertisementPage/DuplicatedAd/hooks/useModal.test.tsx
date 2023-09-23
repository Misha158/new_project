import { renderHook, waitFor } from "@testing-library/react";
import { useModal } from "./useModal";

describe("useModal", () => {
  it("Should open and close the modal", async () => {
    const { result } = renderHook(() => useModal({ setStep: () => {} }));

    expect(result.current.isModalOpen).toBeFalsy();

    result.current.showModal();

    await waitFor(() => {
      expect(result.current.isModalOpen).toBeTruthy();
    });

    result.current.closeModal();

    await waitFor(() => {
      expect(result.current.isModalOpen).toBeFalsy();
    });
  });

  it("Should call the stepper next", () => {
    const mockSetStep = jest.fn();
    const { result } = renderHook(() => useModal({ setStep: mockSetStep }));

    result.current.handleNext();

    expect(mockSetStep).toHaveBeenCalledTimes(1);
  });

  it("Should call the stepper back", () => {
    const mockSetStep = jest.fn();
    const { result } = renderHook(() => useModal({ setStep: mockSetStep }));

    result.current.handleBack();

    expect(mockSetStep).toHaveBeenCalledTimes(1);
  });
});
