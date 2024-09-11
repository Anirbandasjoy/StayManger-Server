import { CookieOptions } from "express";
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

// handle lgoin logic
export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      throw createError(400, "Password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, "Please sign up, user not registered");
    }

    if (!user.password) {
      throw createError(400, "User does not have a password set");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw createError(400, "Email/password incorrect, try again");
    }

    const accessToken = createToken({ user }, jwtAccessKey, jwtAccessExpiresin);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
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

// handle google Login

export const handleGoogleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw createError(401, "User not authenticated");
    }

    const accessToken = createToken(
      { user: req.user },
      jwtAccessKey,
      jwtAccessExpiresin
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.redirect("https://staymanager404.vercel.app");

    successResponse(res, {
      message: "Google Login Successfully",
      payload: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGithubLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw createError(401, "User not authenticated");
    }

    const accessToken = createToken(
      { user: req.user },
      jwtAccessKey,
      jwtAccessExpiresin
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.redirect("https://staymanager404.vercel.app");

    successResponse(res, {
      message: "Github Login Successfully",
      payload: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// handle logout login

export const handleLogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res.clearCookie("accessToken", cookieOptions);
    successResponse(res, {
      message: "LogOut successfully",
    });
  } catch (error) {
    next(error);
  }
};
