import mongoose from "mongoose";
import { p_dbURL } from "../helper/secret";

const dbURL = p_dbURL;

if (!dbURL) {
  throw new Error(
    "Database URL (dbURL) is not defined in the environment variables."
  );
}

const dbConnection = async () => {
  try {
    await mongoose.connect(dbURL as string);
    console.log("Database is connected successfully");

    mongoose.connection.on("error", (error) => {
      console.error("Database connection error", error);
    });
  } catch (error) {
    console.error("Initial database connection error", error);
  }
};

export default dbConnection;
