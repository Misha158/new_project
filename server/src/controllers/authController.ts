import { Request, Response } from "express";
import AuthService from "../services/authService";
import jwt from "jsonwebtoken";

const thirtyDays = 30 + 24 * 60 * 60 * 1000;

const generateAccessToken = (id: number, expiresIn: string) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn });
};

class AuthController {
  signupUser = async (req: Request, res: Response) => {
    try {
      const createdUser = await AuthService.signupUser({ credentials: req.body });

      const accessToken = generateAccessToken(createdUser.id, "30m");
      const refreshToken = generateAccessToken(createdUser.id, "30d");

      res.cookie("refreshToken", refreshToken, { maxAge: thirtyDays, httpOnly: true });
      res.status(200).json({ accessToken });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };

  signinUser = async (req: Request, res: Response) => {
    try {
      const signinUser = await AuthService.signinUser({ credentials: req.body });

      const accessToken = generateAccessToken(signinUser.existedUser.id, process.env.ACCESS_TOKEN_LIVE as string);
      const refreshToken = generateAccessToken(signinUser.existedUser.id, "30d");

      res.cookie("refreshToken", refreshToken, { maxAge: thirtyDays, httpOnly: true });
      res.status(200).json({ accessToken });
    } catch (err) {
      console.log("err", err);

      res.status(500).send(`Sighup failed with ${err}`);
    }
  };

  refreshTokens = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;
      const { userData } = await AuthService.refresh({ refreshToken });

      // @ts-ignore
      const accessToken = generateAccessToken(userData.id, process.env.ACCESS_TOKEN_LIVE as string);

      res.cookie("refreshToken", refreshToken, { maxAge: thirtyDays, httpOnly: true });
      res.status(200).json({ accessToken });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };
}

export default new AuthController();
