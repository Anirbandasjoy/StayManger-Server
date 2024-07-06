import { body } from "express-validator";

const validateProcessRegistation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 35 })
    .withMessage("Name should be at least 3-35 char long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Address"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Passoword should be at least six char long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    ),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^01[3-9]\d{8}$/)
    .withMessage("Phone number must be a valid Bangladeshi phone number"),

  body("address").trim().optional(),

  body("profileImage").trim().optional(),
  body("department").trim().optional(),

  body("backgroundImage")
    .optional()
    .isString()
    .withMessage("Background image must be a string if provided"),

  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string if provided"),
];

const validateRegistationUser = [
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Token is required")
    .matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
    .withMessage("Token must be a valid JWT token"),
];

const validateUpdatePassword = [
  body("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("oldPassword is required")
    .isLength({ min: 6 })
    .withMessage("Passoword should be at least six char long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    ),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength({ min: 6 })
    .withMessage("Passoword should be at least six char long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    ),
  body("confrimPassword")
    .trim()
    .notEmpty()
    .withMessage("confrimPassword is required")
    .isLength({ min: 6 })
    .withMessage("Passoword should be at least six char long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    ),
];

const validateLoginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Address"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Passoword should be at least six char long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character (@$!%*#?&)"
    ),
];

const validateUpdateUserRole = [
  body("role").trim().notEmpty().withMessage("Role is required"),
];

export {
  validateProcessRegistation,
  validateRegistationUser,
  validateLoginUser,
  validateUpdatePassword,
  validateUpdateUserRole,
};
