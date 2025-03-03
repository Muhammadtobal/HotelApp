import {
  createBookingSchema,
  updateBookingSchema,
  getOneBookingSchema,
} from "../middlewares/validate.js";

import { paginate, getPaginationInfo } from "../utils/pagination.js";
import { updateBookingService ,createBookingService} from "../services/bookingServices.js";

import prisma from "../prisma/client.js";
export async function createBooking(req, res, next) {
  try {
    const { userId, hotelId, checkIn, checkOut, status } = req.body;
    await createBookingSchema.validateAsync({
      userId,
      hotelId,
      checkIn,
      checkOut,
      status,
    });

    const newBooking = await createBookingService({
      userId,
      hotelId,
      checkIn,
      checkOut,
      status,
    });
    res.status(200).json({ message: "success", Data: newBooking });
  } catch (error) {
    next(error);
  }
}

export async function getAllBooking(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const allBooking = await paginate(prisma.booking, page, limit);
    const pagination = await getPaginationInfo(prisma.booking, page, limit);
    res
      .status(200)
      .json({ success: true, AllData: allBooking, Pagination: pagination });
  } catch (error) {
    next(error);
  }
}

export async function getOneBooking(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getOneBookingSchema.validateAsync({ _id });
    const bookingExist = await prisma.booking.findUnique({
      where: { id: _id },
    });
    res.status(200).json({ success: true, Data: bookingExist });
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req, res, next) {
  try {
    const _id = Number(req.params.id);
    const { userId, hotelId, checkIn, checkOut, status } = req.body;
   await updateBookingSchema.validateAsync({
      _id,
      userId,
      hotelId,
      checkIn,
      checkOut,
      status,
    });

    const bookingFields = await updateBookingService({
      _id,
      userId,
      hotelId,
      checkIn,
      checkOut,
      status,
    });

    res.status(200).json({
      success: true,
      message: "The booking updated successfully",
      Data: bookingFields,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBooking(req, res, next) {
  try {
    const _id = Number(req.params.id);
     await getOneBookingSchema.validateAsync({ _id });
    const deletedBooking = await prisma.booking.delete({ where: { id: _id } });
    res.status(200).json({
      success: true,
      message: "The booking deleted successfully",
      Data: deletedBooking,
    });
  } catch (error) {
    next(error);
  }
}
