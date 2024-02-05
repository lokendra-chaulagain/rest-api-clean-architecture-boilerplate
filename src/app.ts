import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import logger from "./utils/logger";
import cors from "cors";
import { deserializeUser } from "./middleware/deserializeUser";
import connectDB from "./utils/connectDB";
import productRouter from "../src/routes/product.route";
import authRouter from "../src/routes/auth.route";

const port = config.get<number>("port");

const app = express();

// Middleware

// Body Parser middleware
app.use(express.json({ limit: "10kb" }));

//  Cors middleware
app.use(
  cors({
    origin: config.get<string>("origin"),
    credentials: true,
  })
);

// Route
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

// Testing
app.get("/healthChecker", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Express Server????",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connectDB();
});
