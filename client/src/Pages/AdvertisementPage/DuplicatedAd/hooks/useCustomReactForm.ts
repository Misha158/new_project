import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Ad, EditedAd, LineItem } from "../../hooks/useFetchTableData";

interface UseCustomReactForm {
  selectedLineItemsRows: LineItem[];
  selectedAdRow: Ad;
}

type AdNameLineItems = Record<string, Partial<Ad>>;

interface GenerateAdNameLineItems {
  selectedLineItemsRows: LineItem[];
  selectedAdRow: Ad;
}

interface GenerateAd {
  campaign_id: number;
  id: number;
  title: string;
  status: string;
  index: number;
}

const generateAd = ({ campaign_id, id, title, status, index }: GenerateAd) => ({
  line_item_id: id,
  campaign_id,
  title: `${title}_${index + 1}`,
  status,
});

export const generateAdNameLineItems = ({ selectedLineItemsRows, selectedAdRow }: GenerateAdNameLineItems) =>
  selectedLineItemsRows.reduce<AdNameLineItems>((acc, { id, campaign_id }, index) => {
    acc[`lineItemId-${id}`] = generateAd({ id, status: selectedAdRow.status, title: selectedAdRow.title, campaign_id, index });

    return { ...acc };
  }, {});

interface FormikValues {
  adNameLineItems: Record<string, Partial<EditedAd>>;
}

export const useCustomReactForm = ({ selectedLineItemsRows, selectedAdRow }: UseCustomReactForm) => {
  const { setValue, getValues, watch } = useForm<FormikValues>({
    defaultValues: {
      adNameLineItems: {},
    },
  });

  useEffect(() => {
    setValue("adNameLineItems", generateAdNameLineItems({ selectedLineItemsRows, selectedAdRow }));
  }, [selectedLineItemsRows]);

  watch("adNameLineItems");

  return {
    adNameLineItems: getValues().adNameLineItems,
    setAdNameLineItems: setValue as (field: string, value: any) => void,
  };
};
