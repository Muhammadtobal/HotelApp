import {
  getAllProperties,
  createProperty,
  getOneProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/properties.controller.js";
import verifyToken from "../middlewares/identifire.js";
import express from "express";

const propertyRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: إدارة العقارات
 */

/**
 * @swagger
 * /api/property/getall-property:
 *   get:
 *     summary: الحصول على جميع العقارات
 *     description: عرض جميع العقارات.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: تم استرجاع جميع العقارات بنجاح.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/property/create-property:
 *   post:
 *     summary: إنشاء عقار جديد
 *     description: يقوم المستخدم بإنشاء عقار جديد.
 *     tags: [Properties]
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
 *                 example: "Luxury Villa"
 *               location:
 *                 type: string
 *                 example: "New York"
 *               price:
 *                 type: number
 *                 example: 150000
 *               description:
 *                 type: string
 *                 example: "A beautiful luxury villa with ocean view."
 *     responses:
 *       201:
 *         description: تم إنشاء العقار بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/property/getone-property/{id}:
 *   get:
 *     summary: الحصول على تفاصيل عقار معين
 *     description: عرض تفاصيل عقار بناءً على معرّف العقار.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف العقار
 *     responses:
 *       200:
 *         description: تم استرجاع تفاصيل العقار بنجاح.
 *       404:
 *         description: لم يتم العثور على العقار.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/property/update-property/{id}:
 *   put:
 *     summary: تحديث تفاصيل عقار
 *     description: يقوم المستخدم بتحديث تفاصيل عقار موجود.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف العقار
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Luxury Villa"
 *               location:
 *                 type: string
 *                 example: "Los Angeles"
 *               price:
 *                 type: number
 *                 example: 200000
 *               description:
 *                 type: string
 *                 example: "Updated villa with more space and amenities."
 *     responses:
 *       200:
 *         description: تم تحديث العقار بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       404:
 *         description: لم يتم العثور على العقار.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/property/delete-property/{id}:
 *   delete:
 *     summary: حذف عقار
 *     description: يقوم المستخدم بحذف عقار بناءً على معرّف العقار.
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف العقار
 *     responses:
 *       200:
 *         description: تم حذف العقار بنجاح.
 *       404:
 *         description: لم يتم العثور على العقار.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

propertyRouter.get("/getall-property", verifyToken(true), getAllProperties);
propertyRouter.post("/create-property", verifyToken(true), createProperty);
propertyRouter.get("/getone-property/:id", verifyToken(true), getOneProperty);
propertyRouter.put("/update-property/:id", verifyToken(true), updateProperty);
propertyRouter.delete("/delete-property/:id", verifyToken(true), deleteProperty);

export default propertyRouter;
