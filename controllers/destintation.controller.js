
import {
  creatDestinationSchema,
  updateDestinationSchema,
  getOneDestinationSchema,
} from "../middlewares/validate.js";
import { paginate, getPaginationInfo } from "../utils/pagination.js";

import {
  createDestinationService,
  deleteDestinationService,
  updateDestinationService,
} from "../services/destinationServices.js";
import prisma from "../prisma/client.js";
import { deleteImage, imagePath } from "../helpers/deleteingImages.js";
export async function getAllDestination(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await paginate(prisma.destination, page, limit);
    const pagination = await getPaginationInfo(prisma.destination, page, limit);
    res
      .status(200)
      .json({ success: true, Data: result, Pagination: pagination });
  } catch (error) {
    next(error);
  }
}

export async function createDestination(req, res, next) {
  try {
    const { city, state, country, address, description } = req.body;
    const { value } = await creatDestinationSchema.validateAsync({
      city,
      state,
      country,
      address,
      description,
    });
    const newDestination = await createDestinationService({
      city,
      state,
      country,
      address,
      description,
    });

    res.status(200).json({ success: true, Data: newDestination });
  } catch (error) {
    next(error);
  }
}

export async function updateDestination(req, res, next) {
  try {
    const _id = Number(req.params.id);
    const { city, state, country, address, description, hotels } = req.body;
     await updateDestinationSchema.validateAsync({
      _id,
      city,
      state,
      country,
      address,
      description,
      hotels,
    });
    const newDestination = await updateDestinationService({
      _id,
      city,
      state,
      country,
      address,
      description,
      hotels,
    });
    res.status(200).json({
      success: true,
      message: "update successfully",
      data: newDestination,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDestination(req, res, next) {
  try {
    const _id = Number(req.params.id);
    
     await getOneDestinationSchema.validateAsync({ _id });
   await deleteDestinationService({_id})
    res
      .status(200)
      .json({ success: true, message: "delete success",  });
  } catch (error) {
    next(error);
  }
}

export async function getOneDestination(req, res, next) {
  try {
    const _id = Number(req.params.id);
    const { value } = await getOneDestinationSchema.validateAsync({ _id });
    const destinationObj = await prisma.destination.findUnique({
      where: { id: _id },
    });
    res.status(200).json({ success: true, Data: destinationObj });
  } catch (error) {
    next(error);
  }
}
