import "dotenv/config";
const dbURL = process.env.dbURL;
const p_dbURL = process.env.p_dbURL;
const processRegistationSecretKey =
  process.env.PROCESS_REGISTATION_SECRET_KEY || "dfdfdfdsfdsff";
const processRegistationExpiresIn =
  process.env.PROCESS_REGISTATION_EXPIRESIN || "1h";
const smtpUserName = process.env.SMTPUSERNAME;
const smtpPassword = process.env.SMTPPASSWORD;
const jwtAccessKey: string =
  process.env.JWTACCESSKEY || "dfdsfdsfdsfdsfdsfdsfdssfdsfdssfdsf";
const jwtAccessExpiresin: string = process.env.JWTACCESS_EXPIRESIN || "365d";
const client_local_url = process.env.CLIENT_LOCAL_URL;
const client_production_url = process.env.CLIENT_PRODUCTION_URL;

export {
  p_dbURL,
  dbURL,
  processRegistationSecretKey,
  processRegistationExpiresIn,
  smtpUserName,
  smtpPassword,
  jwtAccessKey,
  jwtAccessExpiresin,
  client_local_url,
  client_production_url,
};
