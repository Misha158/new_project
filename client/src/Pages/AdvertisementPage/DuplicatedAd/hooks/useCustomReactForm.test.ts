import { renderHook } from "@testing-library/react-hooks";
import { useCustomReactForm } from "./useCustomReactForm";

const mockSelectedAdRows = {
  campaign_id: 1,
  line_item_id: 1,
  title: "ad-title",
  id: 1,
  status: "ad-test-status",
};

const mockSelectedLineItemsRows = [
  {
    campaign_id: 1,
    title: "line-title-1",
    id: 1,
    status: "line-test-status-1",
  },
  {
    campaign_id: 2,
    title: "line-title-2",
    id: 2,
    status: "line-test-status-2",
  },
];
const mockSetterForm = jest.fn();
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    setValue: mockSetterForm,
    getValues: () => ({ adNameLineItems: {} }),
  }),
}));

describe("useSetAdNameLineItems", () => {
  it("Should correct set ad name for line items", () => {
    renderHook(() =>
      useCustomReactForm({
        selectedAdRow: mockSelectedAdRows,
        selectedLineItemsRows: mockSelectedLineItemsRows,
      })
    );

    expect(mockSetterForm).toHaveBeenCalledWith("adNameLineItems", {
      "lineItemId-1": {
        campaign_id: 1,
        line_item_id: 1,
        status: "ad-test-status",
        title: "ad-title_1",
      },
      "lineItemId-2": {
        campaign_id: 2,
        line_item_id: 2,
        status: "ad-test-status",
        title: "ad-title_2",
      },
    });
  });
});
