import {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import express from "express";
import verifyToken from "../middlewares/identifire.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: إدارة بيانات المستخدمين
 */

/**
 * @swagger
 * /api/user/getall-user:
 *   get:
 *     summary: الحصول على جميع المستخدمين
 *     description: عرض جميع المستخدمين.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: تم استرجاع جميع المستخدمين بنجاح.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/user/getone-user/{id}:
 *   get:
 *     summary: الحصول على تفاصيل مستخدم معين
 *     description: عرض تفاصيل مستخدم بناءً على معرّف المستخدم.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *     responses:
 *       200:
 *         description: تم استرجاع تفاصيل المستخدم بنجاح.
 *       404:
 *         description: لم يتم العثور على المستخدم.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/user/update-user/{id}:
 *   put:
 *     summary: تحديث بيانات مستخدم
 *     description: يقوم المستخدم بتحديث بياناته بناءً على معرف المستخدم.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
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
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: تم تحديث بيانات المستخدم بنجاح.
 *       400:
 *         description: بيانات غير صحيحة.
 *       404:
 *         description: لم يتم العثور على المستخدم.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

/**
 * @swagger
 * /api/user/delete-user/{id}:
 *   delete:
 *     summary: حذف مستخدم
 *     description: يقوم المستخدم بحذف حسابه بناءً على معرف المستخدم.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *     responses:
 *       200:
 *         description: تم حذف المستخدم بنجاح.
 *       404:
 *         description: لم يتم العثور على المستخدم.
 *       401:
 *         description: لم يتم توثيق المستخدم.
 *       500:
 *         description: خطأ داخلي في الخادم.
 */

userRouter.get("/getall-user", verifyToken(true), getAllUsers);
userRouter.get("/getone-user/:id", verifyToken(true), getOneUser);
userRouter.put("/update-user/:id", verifyToken(), updateUser);
userRouter.delete("/delete-user/:id", verifyToken(), deleteUser);

export default userRouter;
