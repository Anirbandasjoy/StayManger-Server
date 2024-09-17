import express from "express";
import passport from "passport";
import session from "express-session";
import {
  cors,
  createError,
  Request,
  Response,
  NextFunction,
  cookieParser,
} from "./helper/import";
import { errorResponse } from "./helper/response";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import roomRouter from "./routes/room.router";
import noticeRouter from "./routes/notice.router";
import adminNotificationRouter from "./routes/adminNotification.router";
import bookingRouter from "./routes/booking.router";
import portalRouter from "./routes/portal.router";
import commentRouter from "./routes/comment.router";
import reactRouter from "./routes/react.router";
import saveRouter from "./routes/save.router";
import reviewRouter from "./routes/review.router";

import "./config/passport";
import teamRouter from "./routes/team.router";
import messageRouter from "./routes/message.router";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://staymanager404.vercel.app"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/notice", noticeRouter);
app.use("/api/v1/admin-notification", adminNotificationRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/portal", portalRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/react", reactRouter);
app.use("/api/v1/save", saveRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/message", messageRouter);

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
