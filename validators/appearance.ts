import { body } from "express-validator";

export const validateAppearanceInput = [
  body("font")
    .trim()
    .notEmpty()
    .withMessage("Font is a required field")
    .isString()
    .withMessage("Font must be a string"),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Language is a required field")
    .isString()
    .withMessage("Language must be a string"),

  body("theme")
    .trim()
    .notEmpty()
    .withMessage("Theme is a required field")
    .isString()
    .withMessage("Theme must be a string"),
];
