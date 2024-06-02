import express from "express";
import {
  cors,
  createError,
  Request,
  Response,
  NextFunction,
  cookieParser,
} from "./helper/import";
import { errorResponse } from "./helper/response";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.router";
import roomRouter from "./routes/room.routes";
import noticeRouter from "./routes/notice.router";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/notice", noticeRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, I am stayManager.",
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
