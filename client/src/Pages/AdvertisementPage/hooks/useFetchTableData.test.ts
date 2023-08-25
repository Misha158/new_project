import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchTableData } from "./useFetchTableData";
import { mockLineItems } from "../../../mocks/lineItems";
import { mockCampaigns } from "../../../mocks/campaigns";
import { mockAds } from "../../../mocks/ads";
import { axios } from "../../../services/config";

jest.mock("../../../services/config");

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

  it("Should make request with campaignIds", async () => {
    (axios.get as jest.Mock).mockReturnValue(axiosResponseAds);

    const initialProps = {
      selectedCampaignIds: [],
      selectedLineItemIds: [],
    };

    const updatedProps = {
      selectedCampaignIds: [6],
      selectedLineItemIds: [5],
    };

    const { rerender } = renderHook((props) => useFetchTableData(props), {
      initialProps: initialProps,
    });

    rerender(updatedProps);

    await act(async () => {
      expect(axios.get as jest.Mock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          params: { campaignIds: "[6]" },
        })
      );
    });
  });
});
