import { Request, Response } from "express";
import AuthService from "../services/authService";
import jwt from "jsonwebtoken";

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

      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };

  signinUser = async (req: Request, res: Response) => {
    try {
      const signinUser = await AuthService.signinUser({ credentials: req.body });

      const accessToken = generateAccessToken(signinUser.existedUser.id, "30m");
      const refreshToken = generateAccessToken(signinUser.existedUser.id, "30d");

      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };
}

export default new AuthController();
