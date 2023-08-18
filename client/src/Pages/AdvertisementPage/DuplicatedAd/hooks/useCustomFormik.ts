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
}

const generateAd = ({ campaign_id, id, title, status }: GenerateAd) => ({
  line_item_id: id,
  campaign_id,
  title,
  status,
});

export const generateAdNameLineItems = ({ selectedLineItemsRows, selectedAdRow }: GenerateAdNameLineItems) =>
  selectedLineItemsRows.reduce<AdNameLineItems>((acc, { id, campaign_id }) => {
    acc[`lineItemId-${id}`] = generateAd({ id, status: selectedAdRow.status, title: selectedAdRow.title, campaign_id });

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
