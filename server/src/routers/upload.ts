import express from "express";

import UploadController from "../controllers/UploadController";
import { authMiddleware } from "../middlewares/authMiddleware";

// const upload = multer({ dest: "uploads/" });

const uploadRoute = express.Router();

uploadRoute.use(authMiddleware);
// uploadRoute.post("/", upload.single("file"), UploadController.upload);
uploadRoute.post("/", UploadController.upload);

export default uploadRoute;
