import { Request, Response } from "express";

import multer from "multer";
import { User } from "../Models/User";
const storageConfig = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

class UploadController {
  upload = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id;
    try {
      upload.single("file")(req, res, async (err) => {
        if (err) {
          // Обработка ошибки загрузки
          return res.status(400).send("Ошибка загрузки файла");
        }

        try {
          await User.update(
            { avatar_url: req.file?.originalname },
            {
              where: {
                id: userId,
              },
            }
          );

          res.send("Файл успешно загружен");
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Upload failed with ${err}`);
    }
  };
}

export default new UploadController();
