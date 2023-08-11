import { renderHook } from "@testing-library/react-hooks";
import { useSetAdNameLineItems } from "./useSetAdNameLineItems";

const mockSelectedAdRows = [
  {
    campaign_id: 1,
    line_item_id: 1,
    title: "ad-title",
    id: 1,
    status: "ad-test-status",
  },
];

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

describe("useSetAdNameLineItems", () => {
  it("Should correct set ad name for line items", () => {
    const { result } = renderHook(() =>
      useSetAdNameLineItems({
        selectedAdRows: mockSelectedAdRows,
        selectedLineItemsRows: mockSelectedLineItemsRows,
      })
    );

    expect(result.current.adNameLineItems).toEqual({
      "lineItemId-1": {
        campaign_id: 1,
        line_item_id: 1,
        status: "ad-test-status",
        title: "ad-title",
      },
      "lineItemId-2": {
        campaign_id: 2,
        line_item_id: 2,
        status: "ad-test-status",
        title: "ad-title",
      },
    });
  });
});
