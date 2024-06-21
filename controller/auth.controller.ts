import {
  bcrypt,
  createError,
  NextFunction,
  Request,
  Response,
} from "../helper/import";
import { createToken } from "../helper/jsonWebToken";
import { successResponse } from "../helper/response";
import { jwtAccessExpiresin, jwtAccessKey } from "../helper/secret";
import User from "../models/user.model";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, "please singUp, user not registerd");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw createError(400, "Email/password incorrect, try again");
    }

    const accessToken = createToken({ user }, jwtAccessKey, jwtAccessExpiresin);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    successResponse(res, {
      message: "User login successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const handleLogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("accessToken");
    successResponse(res, {
      message: "LogOut successfully",
    });
  } catch (error) {
    next(error);
  }
};
