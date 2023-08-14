import { screen, render } from "@testing-library/react";
import { ReviewAdNames } from "./ReviewAdNames";
import { mockAds } from "../../../../mocks/ads";
import { mockLineItems } from "../../../../mocks/lineItems";

const mockProps = {
  selectedLineItemsRows: [mockLineItems],
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
  it("Should render line item inputs with auto incremented names", () => {
    render(<ReviewAdNames {...mockProps} />);
    screen.logTestingPlaygroundURL();
  });
  it("Should render line item inputs with auto incremented names and edited names", () => {});
  it("Should change ad name correctly", () => {});
});
