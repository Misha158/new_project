import { screen, render } from "@testing-library/react";
import { ReviewAdNames } from "./ReviewAdNames";
import { mockAds } from "../../../../mocks/ads";
import { mockLineItems } from "../../../../mocks/lineItems";
import userEvent from "@testing-library/user-event";

const mockProps = {
  selectedLineItemsRows: mockLineItems,
  selectedAd: mockAds[0],
  setAdNameLineItems: () => {},
  adNameLineItems: {
    "lineItemId-4": {
      editedAdName: "editedAdName",
    },
  },
};

describe("<ReviewAdNames />", () => {
  it("Should render without crashing", () => {
    render(<ReviewAdNames {...mockProps} />);
  });

  it("Should render line item inputs with auto incremented names and edited names", () => {
    render(<ReviewAdNames {...mockProps} />);

    expect(screen.getByDisplayValue("editedAdName")).toBeInTheDocument();
    expect(screen.getByDisplayValue(/ad 4_2/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/ad 4_3/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/ad 4_4/i)).toBeInTheDocument();
  });
  it("Should change ad name correctly", async () => {
    render(<ReviewAdNames {...mockProps} />);
    const firstInput = screen.getByDisplayValue("editedAdName");

    await userEvent.clear(firstInput);
    await userEvent.type(firstInput, "new-changed-ad-name");

    expect(screen.getByDisplayValue("new-changed-ad-name")).toBeInTheDocument();
  });
});
