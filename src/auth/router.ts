import express from "express";
import { AuthController } from "./controller";
import { checkAuthenticateTokenMiddleware } from "./middleware";

const router = express.Router();

router.post("/registration", AuthController.registration);

router.post("/login", AuthController.login);

router.get("/me", checkAuthenticateTokenMiddleware, AuthController.me);

router.post("/refresh", AuthController.refresh);

export default router;
