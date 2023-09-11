import express from "express";
import AuthController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signupUser", AuthController.signupUser);
authRouter.post("/signinUser", AuthController.signinUser);
authRouter.get("/refreshTokens", AuthController.refreshTokens);

export default authRouter;
