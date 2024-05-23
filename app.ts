import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, this is Node.js, Express.js and TypeScript.",
  });
});

export default app;
