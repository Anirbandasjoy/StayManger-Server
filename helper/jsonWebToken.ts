import { jwt } from "./import";

export const createToken = (
  payload: any,
  secretKey: string,
  expiresIn: string
) => {
  try {
    return jwt.sign(payload, secretKey, { expiresIn });
  } catch (error) {
    console.log(error);
  }
};
