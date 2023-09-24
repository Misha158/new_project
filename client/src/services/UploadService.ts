import { message } from "antd";
import { axios } from "./config";

export class UploadService {
  static upload = async ({ formData }: { formData: FormData }) => {
    try {
      const { data } = await axios.post("/uploads", formData);

      return data;
    } catch (e) {
      message.error(`Campaigns failed with ${e.message}`);
      throw new Error(e.message);
    }
  };
}
