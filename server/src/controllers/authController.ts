import { Request, Response } from "express";
import AuthService from "../services/authService";
import jwt from "jsonwebtoken";

const generateAccessToken = (id: number) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: "24h" });
};

class AuthController {
  signupUser = async (req: Request, res: Response) => {
    try {
      const createdUser = await AuthService.signupUser({ credentials: req.body });

      const token = generateAccessToken(createdUser.id);

      res.status(200).json({ token });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };

  signinUser = async (req: Request, res: Response) => {
    try {
      const signinUser = await AuthService.signinUser({ credentials: req.body });
      const token = generateAccessToken(signinUser.existedUser.id);

      res.status(200).json({ token });
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };
}

export default new AuthController();
