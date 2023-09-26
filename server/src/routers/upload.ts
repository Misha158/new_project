import express from "express";

import UploadController from "../controllers/UploadController";
import { authMiddleware } from "../middlewares/authMiddleware";
import multer from "multer";

// const storageConfig = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadRoute = express.Router();

uploadRoute.use(authMiddleware);
uploadRoute.post("/", upload.single("file"), UploadController.upload);

export default uploadRoute;
