import { Router } from "express";
import {
  loginController,
  registerController,
  logoutController,
  profileController,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerController);

router.post("/login", validateSchema(loginSchema), loginController);

router.post("/logout", logoutController);

router.get("/profile", authRequired, profileController);

export default router;
