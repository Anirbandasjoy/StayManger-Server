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

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("profileImage")
    .trim()
    .notEmpty()
    .withMessage("profileImage is required"),

  body("department").trim().notEmpty().withMessage("Department is required"),

  body("backgroundImage")
    .optional()
    .isString()
    .withMessage("Background image must be a string if provided"),

  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string if provided"),
];



export { validateProcessRegistation };
