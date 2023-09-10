import express from "express";
import AdvertisementController from "../controllers/advertisementController";
import { authMiddleware } from "../middlewares/authMiddleware";

const advertisementRouter = express.Router();

advertisementRouter.use(authMiddleware);

advertisementRouter.get("/campaigns", AdvertisementController.getCampaigns);
advertisementRouter.get("/lineItems", AdvertisementController.getLineItems);
advertisementRouter.get("/ads", AdvertisementController.getAds);

advertisementRouter.post("/createAds", AdvertisementController.createAds);
advertisementRouter.delete("/ads", AdvertisementController.deleteAds);

export default advertisementRouter;
