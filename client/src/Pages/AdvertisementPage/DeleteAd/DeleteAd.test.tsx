import { screen, render, waitFor } from "@testing-library/react";
import { DeleteAd } from "./DeleteAd";
import { mockAds } from "../../../mocks/ads";
import userEvent from "@testing-library/user-event";

describe("<DeleteAd />", () => {
  it("Button should be disabled, if selectedAdRows is empty", () => {
    const mockProps = {
      selectedAdRows: [],
      setAds: jest.fn(),
    };

    render(<DeleteAd {...mockProps} />);

    const btn = screen.getByRole("button", {
      name: /delete ad/i,
    });

    expect(btn).toBeDisabled();
  });

  it("Should open modal with table with ads which will be deleted", async () => {
    const mockSetAds = jest.fn();
    const mockProps = {
      selectedAdRows: mockAds,
      setAds: mockSetAds,
    };

    render(<DeleteAd {...mockProps} />);

    const btn = screen.getByRole("button", {
      name: /delete ad/i,
    });

    await userEvent.click(btn);

    await waitFor(() => {
      expect(window.document.querySelector(".ant-modal-content")).toBeInTheDocument();
      screen.logTestingPlaygroundURL();
    });

    const deleteBtn = screen.getByRole("button", { name: "Delete" });

    await userEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockSetAds).toHaveBeenCalled();
    });
  });
});
