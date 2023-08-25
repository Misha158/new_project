import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AdvertisementService } from "../../../services/AdvertisementService";

export interface Entity {
  title: string;
  id: number;
  status: string;
}

export interface Campaign extends Entity {
  title: string;
  id: number;
  status: string;
}

export interface LineItem extends Entity {
  campaign_id: number;
}

export interface Ad extends Entity {
  campaign_id: number;
  line_item_id: number;
}

export interface EditedAd extends Ad {
  editedAdName?: string;
}

interface Result {
  campaigns: Campaign[];
  lineItems: LineItem[];
  ads: Ad[];
  setAds: Dispatch<SetStateAction<Ad[]>>;
}

interface Props {
  selectedCampaignIds: number[];
  selectedLineItemIds: number[];
}

const fetchAll = async () => {
  const campaigns = await AdvertisementService.getCampaigns();
  const lineItems = await AdvertisementService.getLineItems({});
  const ads = await AdvertisementService.getAds({});

  return {
    campaigns,
    lineItems,
    ads,
  };
};

export const useFetchTableData = ({ selectedCampaignIds, selectedLineItemIds }: Props): Result => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  const refOldSelectedCampaignIds = useRef(selectedCampaignIds);
  const refOldSelectedLineItemIds = useRef(selectedLineItemIds);

  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      const fetchAllData = async () => {
        const { campaigns, lineItems, ads } = await fetchAll();

        setCampaigns(campaigns);
        setLineItems(lineItems);
        setAds(ads);
      };

      void fetchAllData();

      ref.current = true;
      return;
    }

    if (refOldSelectedCampaignIds.current !== selectedCampaignIds) {
      const fetchLineItemsAndAds = async ({
        selectedCampaignIds,
        selectedLineItemIds,
      }: {
        selectedCampaignIds: number[];
        selectedLineItemIds: number[];
      }) => {
        const lineItems = await AdvertisementService.getLineItems({ selectedCampaignIds });
        const ads = await AdvertisementService.getAds({ selectedCampaignIds, selectedLineItemIds });

        setLineItems(lineItems);
        setAds(ads);
        refOldSelectedCampaignIds.current = selectedCampaignIds;
      };

      void fetchLineItemsAndAds({ selectedCampaignIds, selectedLineItemIds });
    } else if (refOldSelectedCampaignIds.current === selectedCampaignIds && refOldSelectedLineItemIds.current !== selectedLineItemIds) {
      const fetchOnlyAds = async () => {
        const ads = await AdvertisementService.getAds({ selectedCampaignIds, selectedLineItemIds });

        setAds(ads);
        refOldSelectedLineItemIds.current = selectedLineItemIds;
      };

      void fetchOnlyAds();
    }
  }, [selectedCampaignIds, selectedLineItemIds]);

  return {
    campaigns,
    lineItems,
    ads,
    setAds,
  };
};
