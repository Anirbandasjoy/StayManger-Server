import app from "./app";
import http from "http";
import dbConnection from "./config/db";
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const main = async () => {
  try {
    await dbConnection();
    server.listen(PORT, async () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("db error", error);
  }
};

main();
