import { useFormik } from "formik";
import { useEffect } from "react";
import { Ad, LineItem } from "../../hooks/useFetchTableData";

interface UseCustomFormik {
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

export const useCustomFormik = ({ selectedLineItemsRows, selectedAdRow }: UseCustomFormik) => {
  const formik = useFormik({
    initialValues: {
      adNameLineItems: {},
      test: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    formik.setFieldValue("adNameLineItems", generateAdNameLineItems({ selectedLineItemsRows, selectedAdRow }));
  }, [selectedLineItemsRows]);

  return {
    adNameLineItems: formik.values.adNameLineItems,
    setAdNameLineItems: formik.setFieldValue,
  };
};
