import { render } from "@testing-library/react";
import { AdInput } from "./AdInput";
import { mockAds } from "../../../../../mocks/ads";
import { mockLineItems } from "../../../../../mocks/lineItems";

const mockProps = {
  adNameLineItems: [],
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
  });
  it("Should set new ad name correctly", () => {});
});
