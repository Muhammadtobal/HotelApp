import {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import verifyToken from "../middlewares/identifire.js";
import express from "express";

const reviewRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: إدارة التقييمات
 */

/**
 * @swagger
 * /api/review/getall-review:
 *   get:
 *     summary: الحصول على جميع التقييمات
 *     description: عرض جميع التقييمات.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: تم استرجاع جميع التقييمات بنجاح.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/review/getone-review/{id}:
 *   get:
 *     summary: الحصول على تفاصيل تقييم معين
 *     description: عرض تفاصيل تقييم بناءً على معرّف التقييم.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف التقييم
 *     responses:
 *       200:
 *         description: تم استرجاع تفاصيل التقييم بنجاح.
 *       404:
 *         description: لم يتم العثور على التقييم.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/review/create-review:
 *   post:
 *     summary: إنشاء تقييم جديد
 *     description: يقوم المستخدم بإنشاء تقييم جديد.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Great experience!"
 *               hotelId:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: تم إنشاء التقييم بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/review/update-review/{id}:
 *   put:
 *     summary: تحديث تقييم
 *     description: يقوم المستخدم بتحديث تقييم موجود بناءً على معرف التقييم.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف التقييم
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Good experience, but can be improved."
 *     responses:
 *       200:
 *         description: تم تحديث التقييم بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       404:
 *         description: لم يتم العثور على التقييم.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/review/delete-review/{id}:
 *   delete:
 *     summary: حذف تقييم
 *     description: يقوم المستخدم بحذف تقييم بناءً على معرف التقييم.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف التقييم
 *     responses:
 *       200:
 *         description: تم حذف التقييم بنجاح.
 *       404:
 *         description: لم يتم العثور على التقييم.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

reviewRouter.get("/getall-review", verifyToken(), getAllReviews);
reviewRouter.get("/getone-review/:id", verifyToken(), getOneReview);
reviewRouter.post("/create-review", verifyToken(), createReview);
reviewRouter.put("/update-review/:id", verifyToken(), updateReview);
reviewRouter.delete("/delete-review/:id", verifyToken(), deleteReview);

export default reviewRouter;
