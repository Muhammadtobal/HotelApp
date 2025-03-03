import verifyToken from "../middlewares/identifire.js";
import {
  createBooking,
  getAllBooking,
  getOneBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";
import express from "express";

const bookingRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: إدارة عمليات الحجز
 */

/**
 * @swagger
 * /api/booking/create-booking:
 *   post:
 *     summary: إنشاء حجز جديد
 *     description: يقوم المستخدم بإنشاء حجز جديد.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60b85f5b6b1f6a001f77c6db"
 *               hotelId:
 *                 type: string
 *                 example: "60b85f5b6b1f6a001f77c6dc"
 *               checkInDate:
 *                 type: string
 *                 example: "2025-05-15"
 *               checkOutDate:
 *                 type: string
 *                 example: "2025-05-20"
 *               status:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: تم إنشاء الحجز بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/booking/getall-booking:
 *   get:
 *     summary: الحصول على جميع الحجوزات
 *     description: عرض جميع الحجوزات.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: تم استرجاع جميع الحجوزات بنجاح.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/booking/getone-booking/{id}:
 *   get:
 *     summary: الحصول على تفاصيل حجز معين
 *     description: عرض تفاصيل حجز بناءً على معرّف الحجز.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الحجز
 *     responses:
 *       200:
 *         description: تم استرجاع تفاصيل الحجز بنجاح.
 *       404:
 *         description: لم يتم العثور على الحجز.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/booking/update-booking/{id}:
 *   put:
 *     summary: تحديث حجز
 *     description: يقوم المستخدم بتحديث بيانات الحجز بناءً على معرف الحجز.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الحجز
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60b85f5b6b1f6a001f77c6db"
 *               hotelId:
 *                 type: string
 *                 example: "60b85f5b6b1f6a001f77c6dc"
 *               checkInDate:
 *                 type: string
 *                 example: "2025-05-15"
 *               checkOutDate:
 *                 type: string
 *                 example: "2025-05-20"
 *               status:
 *                 type: string
 *                 example: "confirmed"
 *     responses:
 *       200:
 *         description: تم تحديث الحجز بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       404:
 *         description: لم يتم العثور على الحجز.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/booking/delete-booking/{id}:
 *   delete:
 *     summary: حذف حجز
 *     description: يقوم المستخدم بحذف حجز بناءً على معرف الحجز.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الحجز
 *     responses:
 *       200:
 *         description: تم حذف الحجز بنجاح.
 *       404:
 *         description: لم يتم العثور على الحجز.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

bookingRouter.post("/create-booking", verifyToken(), createBooking);
bookingRouter.get("/getall-booking", verifyToken(), getAllBooking);
bookingRouter.get("/getone-booking/:id", verifyToken(), getOneBooking);
bookingRouter.put("/update-booking/:id", verifyToken(), updateBooking);
bookingRouter.delete("/delete-booking/:id", verifyToken(), deleteBooking);

export default bookingRouter;
