import { screen, render } from "@testing-library/react";
import { Modal } from "./Modal";
import { mockLineItems } from "../../../../mocks/lineItems";
import { mockAds } from "../../../../mocks/ads";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useSelectedRows", () => ({
  useSelectedRows: () => ({
    selectedRows: [mockLineItems[0]],
    onRow: () => {},
    rowSelection: [],
  }),
}));

jest.mock("../hooks/useCustomFormik", () => ({
  useCustomFormik: () => ({
    adNameLineItems: {},
    setAdNameLineItems: () => {},
  }),
}));

describe("<Modal />", () => {
  it("Should open modal - and should close modal", () => {
    const mockProps = {
      step: 1,
      isModalOpen: false,
      lineItems: mockLineItems,
      selectedAdRows: [mockAds[0]],
      closeModal: () => {},
      handleNext: () => {},
      handleBack: () => {},
    };

    // use rerender from render
    const { rerender } = render(<Modal {...mockProps} />);

    expect(screen.queryByText("Basic Modal")).not.toBeInTheDocument();

    rerender(<Modal {...{ ...mockProps, isModalOpen: true }} />);
    expect(screen.getByText("Basic Modal")).toBeInTheDocument();
  });

  it("Should call on next and on back handlers", async () => {
    const mockOnNext = jest.fn();
    const mockOnBack = jest.fn();

    const mockProps = {
      step: 1,
      isModalOpen: true,
      lineItems: mockLineItems,
      selectedAdRows: [mockAds[0]],
      closeModal: () => {},
      handleNext: mockOnNext,
      handleBack: mockOnBack,
    };

    // use rerender from render
    const { rerender } = render(<Modal {...mockProps} />);
    const nextBtn = screen.getByText(/next/i);

    await userEvent.click(nextBtn);
    expect(mockOnNext).toHaveBeenCalledTimes(1);

    rerender(<Modal {...{ ...mockProps, step: 2 }} />);

    const backBtn = screen.getByText(/back/i);

    await userEvent.click(backBtn);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
