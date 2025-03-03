import {
  signUp,
  logIn,
  logOut,
  verfiyOtp,
  googleCallback,
  googleAuth,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/identifire.js";
import express from "express";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: إدارة عمليات المصادقة
 */

/**
 * @swagger
 * /api/auth/singup-user:
 *   post:
 *     summary: تسجيل مستخدم جديد
 *     description: يقوم المستخدم الجديد بالتسجيل باستخدام بياناته.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "00aaAA11"
 *               name:
 *                type: string
 *                example: "donald"
 *     responses:
 *       201:
 *         description: تم إنشاء الحساب بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *       500:
 *         description: خطأ داخلي في الخادم.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 *                 stack:
 *                   type: string
 *                   example: "Error stack trace (only in development)"
 */

/**
 * @swagger
 * /api/auth/login-user:
 *   post:
 *     summary: تسجيل الدخول
 *     description: يقوم المستخدم بتسجيل الدخول باستخدام بياناته.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "00aaAA11"
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       500:
 *         description: خطأ داخلي في الخادم.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 *                 stack:
 *                   type: string
 *                   example: "Error stack trace (only in development)"
 */

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Google OAuth callback
 *     description: يقوم بالتعامل مع رد Google OAuth وعمليات المصادقة.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول باستخدام Google بنجاح.
 *       400:
 *         description: طلب غير صحيح بسبب أخطاء التحقق أو مشاكل في التوثيق.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *       500:
 *         description: خطأ داخلي في الخادم.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 *                 stack:
 *                   type: string
 *                   example: "Error stack trace (only in development)"
 */

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: يقوم بالتعامل مع رد Google OAuth وعمليات المصادقة.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول باستخدام Google بنجاح.
 *       400:
 *         description: طلب غير صحيح بسبب أخطاء التحقق أو مشاكل في التوثيق.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *       500:
 *         description: خطأ داخلي في الخادم.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 *                 stack:
 *                   type: string
 *                   example: "Error stack trace (only in development)"
 */

/**
 * @swagger
 * /api/auth/logout-user:
 *   get:
 *     summary: تسجيل الخروج
 *     description: يقوم بتسجيل خروج المستخدم الحالي.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: تم تسجيل الخروج بنجاح.
 *       500:
 *         description: خطأ داخلي في الخادم.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 *                 stack:
 *                   type: string
 *                   example: "Error stack trace (only in development)"
 */

// تعيين الـ routes
authRouter.post("/singup-user", signUp);
authRouter.post("/login-user", logIn);
authRouter.post("/verfiy", verfiyOtp);
authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleCallback);

authRouter.get("/logout-user", verifyToken(), logOut);

export default authRouter;
