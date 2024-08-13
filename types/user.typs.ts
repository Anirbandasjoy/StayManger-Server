// types/user.typs.ts
import { Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  backgroundImage?: string;
  phone?: string;
  address?: string;
  department?: string;
  role?: string;
  birthdate?: string;
  googleId?: string;
  githubId?: string;
}
