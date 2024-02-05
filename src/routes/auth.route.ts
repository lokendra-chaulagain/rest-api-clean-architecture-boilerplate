import express from "express";
import { createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler } from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();
// router.use(deserializeUser, requireUser);

// router.post("/api/users", restrictTo("admin"), validate(createUserSchema), createUserHandler);
router.post("/users", validate(createUserSchema), createUserHandler);
router.post("/sessions", validate(createSessionSchema), createUserSessionHandler);
router.get("/sessions", requireUser, getUserSessionsHandler);
router.delete("/sessions", requireUser, deleteSessionHandler);

export default router;
