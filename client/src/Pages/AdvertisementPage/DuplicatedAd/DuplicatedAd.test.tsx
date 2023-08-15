import { screen, render, waitFor } from "@testing-library/react";
import { DuplicatedAd } from "./DuplicatedAd";
import { mockLineItems } from "../../../mocks/lineItems";
import { mockAds } from "../../../mocks/ads";
import userEvent from "@testing-library/user-event";

describe("<DuplicatedAd />", () => {
  it("Should render without crashing", () => {
    render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={mockAds[0]} />);
  });
  it("Should show tooltip message", async () => {
    render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={mockAds[0]} />);
    const btn = screen.getByText(/duplicate ad/i);
    await userEvent.hover(btn);
    await waitFor(() => {
      screen.logTestingPlaygroundURL();
    });
  });
  it("Should call open modal on click at button", () => {});
});
