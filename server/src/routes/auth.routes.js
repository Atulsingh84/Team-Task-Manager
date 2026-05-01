import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { googleLoginSchema, loginSchema, signupSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema } from "../validators/auth.validators.js";
import { login, loginWithGoogle, me, signup, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/google", validate(googleLoginSchema), asyncHandler(loginWithGoogle));
router.post("/verify-email", validate(verifyEmailSchema), asyncHandler(verifyEmail));
router.post("/forgot-password", validate(forgotPasswordSchema), asyncHandler(forgotPassword));
router.post("/reset-password", validate(resetPasswordSchema), asyncHandler(resetPassword));
router.get("/me", requireAuth, asyncHandler(me));

export default router;
