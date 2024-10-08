import { Request, Response, NextFunction } from "express";
import { successResponse } from "../helper/response";
import { createToken } from "../helper/jsonWebToken";
import {
  processRegistationExpiresIn,
  processRegistationSecretKey,
} from "../helper/secret";
import { bcrypt, createError, jwt, sendingEmail } from "../helper/import";
import { generateActivationEmailTemplate } from "../helper/emailTemplate";
import User from "../models/user.model";
import { userExistByEmail } from "../helper/exist";
import { findWithId } from "../services";

export const handleProcessRegistation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, profileImage, phone, address, department } =
      req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await userExistByEmail(email, User);
    const token = createToken(
      {
        name,
        email,
        password: hashPassword,
        profileImage,
        phone,
        address,
        department,
      },
      processRegistationSecretKey,
      processRegistationExpiresIn
    );
    if (!token) {
      throw createError(401, "Not Genaret Token");
    }
    const emailData = {
      email,
      subject: "User Activation Email",
      html: generateActivationEmailTemplate(name, token),
    };
    try {
      await sendingEmail(emailData);
    } catch (error) {
      console.error(error);
    }
    successResponse(res, {
      message: `Please Active you email : ${email}`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const handleRegisterdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw createError(404, "Token Not found");
    }
    const decoded = jwt.verify(
      token,
      processRegistationSecretKey
    ) as jwt.JwtPayload;
    if (!decoded) {
      throw createError(203, "Invalid Token");
    }

    await userExistByEmail(decoded.email, User);

    await User.create(decoded);
    successResponse(res, {
      message: "Registation Process Complete",
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(403, "User not authnticated"));
    }
    const { oldPassword, newPassword, confrimPassword } = req.body;

    const user = await findWithId(req?.user?._id, User);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const matchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchPassword) {
      return next(createError(401, "Old password in incorrect"));
    }
    if (newPassword !== confrimPassword) {
      return next(
        createError(403, "newPassword and confrimpassword don't match")
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    successResponse(res, {
      message: "Successfully updated password",
    });
  } catch (error) {
    next(error);
  }
};
// get current user
export const handleGetCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(403, "User not authenticated"));
    }
    const currentUser = await findWithId(req.user._id, User);
    successResponse(res, {
      message: "Fetched current user successfully",
      payload: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", limit = "20", search = "" } = req.query;

    const pageNumber = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNumber = Math.max(parseInt(limit as string, 10) || 20, 1);

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { address: { $regex: searchRegExp } },
        { role: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
        { department: { $regex: searchRegExp } },
        { birthdate: { $regex: searchRegExp } },
      ],
    };

    const option = { password: 0 };

    const allUsers = await User.find(filter, option);

    const totalUsers = allUsers.length;

    const users = allUsers.slice(
      (pageNumber - 1) * limitNumber,
      pageNumber * limitNumber
    );

    const totalPages = Math.ceil(totalUsers / limitNumber);

    successResponse(res, {
      message: "Users retrieved successfully",
      payload: {
        users,
        pagination: {
          totalUsers,
          totalPages,
          currentPage: pageNumber,
          pageSize: limitNumber,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await findWithId(id, User);
    successResponse(res, {
      message: "Single User fetched successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await findWithId(id, User);
    if (role !== undefined) user.role = role;
    await user.save();
    successResponse(res, {
      message: "Role was updated successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(403, "User not Authnticated"));
    }
    const user = await findWithId(req?.user?._id, User);
    const {
      name,
      profileImage,
      backgroundImage,
      phone,
      address,
      department,
      birthdate,
    } = req.body;
    if (name !== undefined) user.name = name;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (backgroundImage !== undefined) user.backgroundImage = backgroundImage;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (department !== undefined) user.department = department;
    if (birthdate !== undefined) user.birthdate = birthdate;

    await user.save();

    successResponse(res, {
      message: "User info updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleUserDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(403, "User not Authnticated"));
    }
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(createError(400, "User not deleted , somthing was rong"));
    }

    successResponse(res, {
      message: "User was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
