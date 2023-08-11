import { renderHook } from "@testing-library/react-hooks";
import { useModal } from "./useModal";

describe("useModal", () => {
  it("Should open and close the modal", () => {
    const { result } = renderHook(() => useModal({ setStep: () => {} }));

    expect(result.current.isModalOpen).toBeFalsy();

    result.current.showModal();

    expect(result.current.isModalOpen).toBeTruthy();

    result.current.closeModal();

    expect(result.current.isModalOpen).toBeFalsy();
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
