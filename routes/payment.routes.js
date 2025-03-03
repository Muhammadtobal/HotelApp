import { createPayment, getPayments } from "../controllers/paymant.controller.js";
import bodyParser from "body-parser";
import express from "express";
import verifyToken from "../middlewares/identifire.js";

const paymentRouter = express.Router();
paymentRouter.use(bodyParser.raw({ type: "application/json" }));

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: إدارة المدفوعات
 */

/**
 * @swagger
 * /api/payment/create-payment:
 *   post:
 *     summary: إنشاء عملية دفع
 *     description: يقوم المستخدم بإنشاء عملية دفع جديدة.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.5
 *               currency:
 *                 type: string
 *                 example: "USD"
 *               paymentMethod:
 *                 type: string
 *                 example: "Credit Card"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: تم إنشاء عملية الدفع بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/payment/get-payment:
 *   get:
 *     summary: الحصول على جميع عمليات الدفع
 *     description: عرض جميع عمليات الدفع.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: تم استرجاع جميع المدفوعات بنجاح.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

paymentRouter.post("/create-payment", createPayment);
paymentRouter.get("/get-payment", getPayments);

export default paymentRouter;
