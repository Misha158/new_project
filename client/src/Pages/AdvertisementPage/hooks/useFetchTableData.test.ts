import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchTableData } from "./useFetchTableData";
import axios from "axios";
import { mockLineItems } from "../../../mocks/lineItems";
import { mockCampaigns } from "../../../mocks/campaigns";
import { mockAds } from "../../../mocks/ads";

jest.mock("axios");

const axiosResponseCampaigns = {
  data: mockCampaigns,
};

const axiosResponseLineItems = {
  data: mockLineItems,
};

const axiosResponseAds = {
  data: mockAds,
};

(axios.get as jest.Mock).mockReturnValueOnce(axiosResponseCampaigns);
(axios.get as jest.Mock).mockReturnValueOnce(axiosResponseLineItems);
(axios.get as jest.Mock).mockReturnValueOnce(axiosResponseAds);

describe("useFetchTableData", () => {
  it("Should return initial data", async () => {
    const mockProps = {
      selectedCampaignIds: [],
      selectedLineItemIds: [],
    };

    const { result, waitForNextUpdate } = renderHook(() => useFetchTableData(mockProps));

    await waitForNextUpdate();

    expect(result.current.campaigns).toEqual(mockCampaigns);
    expect(result.current.lineItems).toEqual(mockLineItems);
    expect(result.current.ads).toEqual(mockAds);
  });
  it("Should return filtered data", async () => {
    const mockProps = {
      selectedCampaignIds: [],
      selectedLineItemIds: [],
    };

    const { result, waitForNextUpdate, rerender } = renderHook(() => useFetchTableData(mockProps));

    rerender({
      selectedCampaignIds: [6],
      selectedLineItemIds: [9],
    });

    await act(async () => {
      await waitForNextUpdate();
      expect(axios.get as jest.Mock).toHaveBeenCalledWith({});
    });
  });
});
