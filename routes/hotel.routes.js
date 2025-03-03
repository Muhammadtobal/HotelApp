import {
  createHotels,
  getAllHotels,
  getOneHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotels.controller.js";
import verifyToken from "../middlewares/identifire.js";
import express from "express";
import multer from "multer";
import { imagePath } from "../helpers/deleteingImages.js";
import fs from "fs";

const hotelRouter = express.Router();
if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: إدارة الفنادق
 */

/**
 * @swagger
 * /api/hotel/create-hotel:
 *   post:
 *     summary: إضافة فندق جديد
 *     description: إضافة فندق جديد إلى النظام مع تحميل صورة.
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "فندق ماريوت"
 *               location:
 *                 type: string
 *                 example: "مدينة نيويورك"
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: صورة الفندق.
 *     responses:
 *       201:
 *         description: تم إضافة الفندق بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/hotel/getAll-hotel:
 *   get:
 *     summary: الحصول على جميع الفنادق
 *     description: عرض جميع الفنادق الموجودة.
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: تم استرجاع جميع الفنادق بنجاح.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/hotel/getone-hotel/{id}:
 *   get:
 *     summary: الحصول على تفاصيل فندق معين
 *     description: عرض تفاصيل فندق معين بناءً على المعرف.
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الفندق.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: تم استرجاع تفاصيل الفندق بنجاح.
 *       404:
 *         description: لم يتم العثور على الفندق.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/hotel/update-hotel/{id}:
 *   put:
 *     summary: تحديث بيانات فندق معين
 *     description: تحديث بيانات فندق موجود في النظام.
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الفندق.
 *         schema:
 *           type: string
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "فندق ماريوت - التحديث"
 *               location:
 *                 type: string
 *                 example: "مدينة باريس"
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: صورة الفندق.
 *     responses:
 *       200:
 *         description: تم تحديث الفندق بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       404:
 *         description: لم يتم العثور على الفندق.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/hotel/delete-hotel/{id}:
 *   delete:
 *     summary: حذف فندق معين
 *     description: حذف فندق معين بناءً على المعرف.
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الفندق.
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: تم حذف الفندق بنجاح.
 *       404:
 *         description: لم يتم العثور على الفندق.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

hotelRouter.post(
  "/create-hotel",
  verifyToken(true),
  upload.single("images"),
  createHotels,
  upload.none()
);
hotelRouter.get("/getAll-hotel", getAllHotels);
hotelRouter.get("/getone-hotel/:id", getOneHotel);
hotelRouter.put(
  "/update-hotel/:id",
  verifyToken(true),
  upload.single("images"),
  updateHotel,
  upload.none()
);
hotelRouter.delete("/delete-hotel/:id", verifyToken(true), deleteHotel);

export default hotelRouter;
