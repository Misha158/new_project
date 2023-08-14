import { screen, render } from "@testing-library/react";
import { AdInput } from "./AdInput";
import { mockAds } from "../../../../../mocks/ads";
import { mockLineItems } from "../../../../../mocks/lineItems";
import userEvent from "@testing-library/user-event";

const mockProps = {
  adNameLineItems: {
    "lineItemId-4": {
      editedAdName: "editedAdName",
    },
  },
  setAdNameLineItems: () => {},
  lineItem: mockLineItems[0],
  selectedAd: mockAds[0],
  index: 1,
};

describe("<AdInput />", () => {
  it("Should render without crashing", () => {
    render(<AdInput {...mockProps} />);
  });

  it("Should return edited ad name", () => {
    render(<AdInput {...mockProps} />);

    expect(screen.getByDisplayValue(/editedadname/i)).toBeInTheDocument();
  });

  it("Should set new ad name correctly", async () => {
    const mockSetAdNameLineItems = jest.fn();

    render(<AdInput {...{ ...mockProps, adNameLineItems: {}, setAdNameLineItems: mockSetAdNameLineItems }} />);
    const inputAdName = screen.getByRole("textbox");

    await userEvent.type(inputAdName, "new-ad-name");

    expect(mockSetAdNameLineItems).toHaveBeenCalled();
    expect(screen.getByDisplayValue(/new-ad-name/i)).toBeInTheDocument();
  });
});
