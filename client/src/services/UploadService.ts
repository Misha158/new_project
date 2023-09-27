import { message } from "antd";
import { axios } from "./config";

export class UploadService {
  static upload = async ({ formData, setProgress }: { formData: FormData; setProgress: any }) => {
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(progress);
          setProgress(progress);
        },
      };

      const { data } = await axios.post("/uploads", formData, config);

      return data;
    } catch (e) {
      message.error(`Campaigns failed with ${e.message}`);
      throw new Error(e.message);
    }
  };
}
