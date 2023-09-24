import express from "express";
import AuthController from "../controllers/authController";

const authRouter = express.Router();

import { authMiddleware } from "../middlewares/authMiddleware";

authRouter.post("/signupUser", AuthController.signupUser);
authRouter.post("/signinUser", AuthController.signinUser);
authRouter.get("/refreshTokens", AuthController.refreshTokens);
authRouter.get("/userInfo", authMiddleware, AuthController.getUserInfo);

export default authRouter;
