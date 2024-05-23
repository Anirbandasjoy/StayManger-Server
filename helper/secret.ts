import "dotenv/config";
const dbURL = process.env.dbURL;
const processRegistationSecretKey =
  process.env.PROCESS_REGISTATION_SECRET_KEY || "dfdfdfdsfdsff";
const processRegistationExpiresIn =
  process.env.PROCESS_REGISTATION_EXPIRESIN || "1h";

const smtpUserName = process.env.SMTPUSERNAME;
const smtpPassword = process.env.SMTPPASSWORD;

export {
  dbURL,
  processRegistationSecretKey,
  processRegistationExpiresIn,
  smtpUserName,
  smtpPassword,
};
