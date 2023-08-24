import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DuplicatedAd } from "./DuplicatedAd";
import { mockAds } from "../../../mocks/ads";
import { useModal } from "./hooks/useModal";
import { mockLineItems } from "../../../mocks/lineItems";

jest.mock("./hooks/useModal");

(useModal as jest.Mock).mockReturnValue({
  isModalOpen: false,
  showModal: () => {},
  closeModal: () => {},
  handleNext: () => {},
  handleBack: () => {},
});

describe("<DuplicatedAd />", () => {
  it("Should render without crashing", () => {
    render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={mockAds} />);
  });

  it("Should show tooltip message", async () => {
    const { container } = render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={mockAds} />);
    const tooltip = container.querySelector(".ant-tooltip-disabled-compatible-wrapper");
    await userEvent.hover(tooltip!);

    // await waitFor(() => {
    //   expect(screen.getByText("Should choose only ONE ad"));
    // });

    expect(await screen.findByText("Should choose only ONE ad")).toBeInTheDocument();
  });

  it("Should call open modal on click at button", async () => {
    const mockShowModal = jest.fn();

    (useModal as jest.Mock).mockReturnValue({
      isModalOpen: false,
      showModal: mockShowModal,
      closeModal: () => {},
      handleNext: () => {},
      handleBack: () => {},
    });

    render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={[mockAds[0]]} />);

    const btn = screen.getByText(/duplicate ad/i);

    await userEvent.click(btn);

    expect(mockShowModal).toHaveBeenCalled();
  });
});
