import { NextFunction, Request, Response } from "express";
import { createError, jwt } from "../helper/import";
import { jwtAccessKey } from "../helper/secret";
import { JwtPayload } from "jsonwebtoken";
export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(createError(401, "Access token not found, please loggedIn"));
    }
    const decode = jwt.verify(accessToken, jwtAccessKey) as JwtPayload;
    if (!decode) {
      return next(createError(401, "Invalid token"));
    }
    if (!(decode as any).user) {
      return next(createError(401, "Token does not contain user information"));
    }
    req.user = (decode as any).user;
    next();
  } catch (error) {
    next(error);
  }
};

export const isLogOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      return next(createError(401, "User already logged in"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
