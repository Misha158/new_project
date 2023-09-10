import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "User is not authorize" });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decodedData;

    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "User is not authorize" });
  }
};
