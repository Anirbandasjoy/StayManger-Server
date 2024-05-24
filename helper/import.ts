import { Request, Response, NextFunction } from "express";
import cors from "cors";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sendingEmail from "./email";
import bcrypt from "bcryptjs";

export {
  Request,
  Response,
  NextFunction,
  cors,
  createError,
  jwt,
  nodemailer,
  sendingEmail,
  bcrypt,
};
