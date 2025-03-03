import {
  createHotelSchema,
  getOneHotelSchema,
  updateHotelSchema,
} from "../middlewares/validate.js";

import { paginate, getPaginationInfo } from "../utils/pagination.js";
import prisma from "../prisma/client.js";
import { imagePath } from "../helpers/deleteingImages.js";
import { deleteImage } from "../helpers/deleteingImages.js";
import {
  updateHotelService,
  deleteHotelService,
  createHotelService,
} from "../services/hotelServices.js";
export async function createHotels(req, res, next) {
  try {
    const {
      name,
      description,
      pricePerNight,

      destinationId,

      propertyId,
    } = req.body;
    const imageFile = req.file ? req.file.filename : null;
    await createHotelSchema.validateAsync({
      name,
      description,
      pricePerNight,

      destinationId,

      propertyId,
    });
    const addNewHotel = await createHotelService({
      name,
      description,
      pricePerNight,
      imageFile,
      destinationId,

      propertyId,
    });

    res.status(201).json({ message: "success", data: addNewHotel });
  } catch (error) {
    if (req.file) deleteImage(req.file.filename, imagePath);
    next(error);
  }
}

export async function getOneHotel(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getOneHotelSchema.validateAsync({ _id });

    const hotelExist = await prisma.hotel.findUnique({
      where: { id: _id },
    });

    res.status(200).json({ success: true, Data: hotelExist });
  } catch (error) {
    next(error);
  }
}

export async function getAllHotels(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const allHotel = await paginate(prisma.hotel, page, limit);

    const pagination = await getPaginationInfo(prisma.hotel, page, limit);

    res.status(200).json({
      message: "success",
      data: allHotel,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateHotel(req, res, next) {
  try {
    const {
      name,
      description,

      pricePerNight,

      destinationId,

      propertyId,
    } = req.body;

    const _id = Number(req.params.id);
    const newImage = req.file ? req.file.filename : undefined;
    await updateHotelSchema.validateAsync({
      _id,
      name,
      description,

      pricePerNight,

      destinationId,

      propertyId,
    });

    const newUpdate = await updateHotelService({
      _id,
      name,
      description,
      newImage,
      pricePerNight,

      destinationId,

      propertyId,
    });

    res.status(200).json({
      success: true,
      message: "The data updated successfully..!",
      Data: newUpdate,
    });
  } catch (error) {
    if (req.file) deleteImage(req.file.filename, imagePath);
    next(error);
  }
}

export async function deleteHotel(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getOneHotelSchema.validateAsync({ _id });
    await deleteHotelService({ _id });
    res.status(200).json({
      success: true,
      message: "The hotel deleted successfully..!",
    });
  } catch (error) {
    next(error);
  }
}
