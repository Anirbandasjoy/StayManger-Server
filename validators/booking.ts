import { param } from "express-validator";

export const validParamsId = [
  param("id").trim().isMongoId().withMessage("id must be a valid MongoDB ID"),
];
