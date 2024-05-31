import { NextFunction, Request, Response } from "express";
import { createError, jwt } from "../helper/import";
import { jwtAccessKey } from "../helper/secret";
export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      createError(404, "accessToken not found , please login");
    }
    const decode = jwt.verify(accessToken, jwtAccessKey);
    if (!decode) {
      createError(401, "Invalid token");
    }
    req.user = decode.user
    next();
  } catch (error) {
    next(error);
  }
};
