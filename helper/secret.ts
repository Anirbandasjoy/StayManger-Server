import "dotenv/config";
const dbURL = process.env.dbURL;
const processRegistationSecretKey =
  process.env.PROCESS_REGISTATION_SECRET_KEY || "dfdfdfdsfdsff";
const processRegistationExpiresIn =
  process.env.PROCESS_REGISTATION_EXPIRESIN || "1h";

export { dbURL, processRegistationSecretKey, processRegistationExpiresIn };
