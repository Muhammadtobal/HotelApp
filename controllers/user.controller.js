import prisma from "../prisma/client.js";
import { getOneUserSchema, updateUserSchema } from "../middlewares/validate.js";
import { hashPassword } from "../utils/hashing.js";
import { paginate, getPaginationInfo } from "../utils/pagination.js";
import { updateUserService } from "../services/userServices.js";

export async function getAllUsers(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pagination = await getPaginationInfo(prisma.user, page, limit);
    const allUsers = await paginate(prisma.user, page, limit);
    res
      .status(200)
      .json({ message: "success", Data: allUsers, Pagination: pagination });
  } catch (error) {
    next(error);
  }
}

export async function getOneUser(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getOneUserSchema.validateAsync({ _id });

    const userExist = await prisma.user.findUnique({ where: { id: _id } });
    res.status(200).json({ success: true, Data: userExist });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const _id = Number(req.params.id);
    const { email, name, password, isAdmin } = req.body;
    await updateUserSchema.validateAsync({
      _id,
      email,
      name,
      password,
      isAdmin,
    });

    const newPassword = password ? await hashPassword(password, 12) : undefined;
    const updatedUser = await updateUserService({
      _id,
      email,
      name,
      password: newPassword,
      isAdmin,
    });

    res.status(200).json({ success: true, Data: updatedUser });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getOneUserSchema.validateAsync({ _id });
    await prisma.user.delete({ where: { id: _id } });
    res.status(200).json({ success: true, message: "The delete success" });
  } catch (error) {
    next(error);
  }
}
export async function storOtp(userId, otp) {
  await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      otp,
      optExires: new Date(Date.now() + 5 * 60 * 1000),
    },
  });
}
export async function verfiyotpUser(userId, otp) {
  const userExist = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });
  if (
    !userExist ||
    userExist.otp !== otp ||
    new Date() > new Date(Number(userExist.otpExpires))
  ) {
    return false;
  }
  await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      otp: null,
      optExires: null,
    },
  });
  return true;
}
