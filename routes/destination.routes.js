import {
  getAllDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  getOneDestination,
} from "../controllers/destintation.controller.js";
import verifyToken from "../middlewares/identifire.js";
import express from "express";

const destinationRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Destination
 *   description: إدارة الوجهات
 */

/**
 * @swagger
 * /api/destination/getAll-destination:
 *   get:
 *     summary: الحصول على جميع الوجهات
 *     description: عرض جميع الوجهات.
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: تم استرجاع جميع الوجهات بنجاح.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 *       400:
 *         description: طلب غير صالح.
 */

/**
 * @swagger
 * /api/destination/create-destination:
 *   post:
 *     summary: إنشاء وجهة جديدة
 *     description: إضافة وجهة جديدة إلى النظام.
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Paris"
 *               description:
 *                 type: string
 *                 example: "أجمل مدينة في العالم."
 *     responses:
 *       201:
 *         description: تم إنشاء الوجهة بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/destination/update-destination/{id}:
 *   put:
 *     summary: تحديث وجهة معينة
 *     description: تحديث بيانات وجهة موجودة في النظام.
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الوجهة.
 *         schema:
 *           type: string
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Paris"
 *               description:
 *                 type: string
 *                 example: "مدينة رائعة بعد التحديث."
 *     responses:
 *       200:
 *         description: تم تحديث الوجهة بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       404:
 *         description: لم يتم العثور على الوجهة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/destination/delete-destination/{id}:
 *   delete:
 *     summary: حذف وجهة معينة
 *     description: حذف الوجهة بناءً على المعرف.
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الوجهة.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: تم حذف الوجهة بنجاح.
 *       404:
 *         description: لم يتم العثور على الوجهة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/destination/getone-destination/{id}:
 *   get:
 *     summary: الحصول على تفاصيل وجهة معينة
 *     description: عرض تفاصيل وجهة معينة بناءً على المعرف.
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الوجهة.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: تم استرجاع التفاصيل بنجاح.
 *       404:
 *         description: لم يتم العثور على الوجهة.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */
destinationRouter.get("/getAll-destination", verifyToken(), getAllDestination);
destinationRouter.post("/create-destination", verifyToken(true), createDestination);
destinationRouter.put("/update-destination/:id", verifyToken(true), updateDestination);
destinationRouter.delete("/delete-destination/:id", verifyToken(true), deleteDestination);
destinationRouter.get("/getone-destination/:id", verifyToken(), getOneDestination);

export default destinationRouter;
