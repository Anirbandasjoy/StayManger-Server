import mongoose from "mongoose";
import { dbURL } from "../helper/secret";

if (!dbURL) {
  throw new Error(
    "Database URL (dbURL) is not defined in the environment variables."
  );
}

const dbConnection = async () => {
  try {
    await mongoose.connect(dbURL as string);
    console.log("db is connected successfully");

    mongoose.connection.on("error", (error) => {
      console.error("db connection error", error);
    });
  } catch (error) {
    console.error("Initial db connection error", error);
  }
};

export default dbConnection;
