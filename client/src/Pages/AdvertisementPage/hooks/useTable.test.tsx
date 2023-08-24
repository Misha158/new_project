import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { useTable } from "./useTable";
import { mockCampaigns } from "../../../mocks/campaigns";
import { mockLineItems } from "../../../mocks/lineItems";
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

describe("useTable", () => {
  it("Should show correct count of entities", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTable({ tabName: "campaign" }));

    expect(result.current.tabItems[0].label).toEqual("Campaigns 0");
    expect(result.current.tabItems[1].label).toEqual("Line items 0");
    expect(result.current.tabItems[2].label).toEqual("Ads 0");

    await waitForNextUpdate();

    expect(result.current.tabItems[0].label).toEqual("Campaigns 7");
    expect(result.current.tabItems[1].label).toEqual("Line items 5");
    expect(result.current.tabItems[2].label).toEqual("Ads 6");
  });
});
