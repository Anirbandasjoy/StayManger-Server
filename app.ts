import express from "express";
import {
  cors,
  createError,
  Request,
  Response,
  NextFunction,
} from "./helper/import";
import { errorResponse } from "./helper/response";
import userRouter from "./routes/user.routes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, this is Node.js, Express.js and TypeScript.",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "route not found"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

export default app;
