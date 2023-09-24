import { Request, Response } from "express";
import UploadService from "../services/uploadService";

class UploadController {
  upload = async (req: Request, res: Response) => {
    try {
      const fileName = req.file?.originalname;
      // @ts-ignore
      const userId = req.user.id;
      await UploadService.upload({ fileName, userId });
      res.status(200).send("File has uploaded");
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Upload failed with ${err}`);
    }
  };
}

export default new UploadController();
