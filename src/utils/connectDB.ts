import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
import retry from "retry";

const dbUri = config.get<string>("dbUri");

// Database connection retry config
const operation = retry.operation({
  retries: 10, // Number of retries
  factor: 1.5, // Exponential backoff factor
  minTimeout: 500, // Minimum time between retries (in milliseconds)
  maxTimeout: 5000, // Maximum time between retries (in milliseconds)
  randomize: true, // Randomize the timeouts
});

export default async function connectDB() {
  operation.attempt(async () => {
    try {
      await mongoose.connect(dbUri);
      logger.info("DB connected...");
    } catch (error: any) {
      logger.error("Could not connect to db", error);
      if (operation.retry(error)) {
        return;
      }
    }
  });
}
