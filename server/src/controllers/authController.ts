import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
  signupUser = async (req: Request, res: Response) => {
    try {
      const createdUser = await AuthService.signupUser({ credentials: req.body });

      res.status(200).json(createdUser);
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };
  signinUser = async (req: Request, res: Response) => {
    try {
      const signinUser = await AuthService.signinUser({ credentials: req.body });

      res.status(200).json(signinUser);
    } catch (err) {
      console.log("err", err);
      res.status(500).send(`Sighup failed with ${err}`);
    }
  };
}

export default new AuthController();
