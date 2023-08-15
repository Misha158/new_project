import { screen, render } from "@testing-library/react";
import { DuplicatedAd } from "./DuplicatedAd";
import { mockLineItems } from "../../../mocks/lineItems";
import { mockAds } from "../../../mocks/ads";
import userEvent from "@testing-library/user-event";
import { useModal } from "./hooks/useModal";

jest.mock("./hooks/useModal");

// (useModal as jest.Mock).mockReturnValueOnce({
//   isModalOpen: false,
//   showModal: () => {},
//   closeModal: () => {},
//   handleNext: () => {},
//   handleBack: () => {},
// });

describe("<DuplicatedAd />", () => {
  it("Should render without crashing", () => {
    (useModal as jest.Mock).mockReturnValueOnce({
      isModalOpen: false,
      showModal: () => {},
      closeModal: () => {},
      handleNext: () => {},
      handleBack: () => {},
    });

    render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={mockAds} />);
  });

  it("Should show tooltip message", async () => {
    (useModal as jest.Mock).mockReturnValueOnce({
      isModalOpen: false,
      showModal: () => {},
      closeModal: () => {},
      handleNext: () => {},
      handleBack: () => {},
    });

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

    (useModal as jest.Mock).mockReturnValueOnce({
      isModalOpen: false,
      showModal: mockShowModal,
      closeModal: () => {},
      handleNext: () => {},
      handleBack: () => {},
    });

    render(<DuplicatedAd lineItems={mockLineItems} selectedAdRows={[mockAds[0]]} />);

    const btn = screen.getByText(/duplicate ad/i);

    await userEvent.click(btn);

    screen.logTestingPlaygroundURL();
    expect(mockShowModal).toHaveBeenCalled();
  });
});
