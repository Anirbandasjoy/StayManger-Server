import app from "./app";
import dbConnection from "./config/db";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running  http://localhost:${PORT}`);
  await dbConnection();
});