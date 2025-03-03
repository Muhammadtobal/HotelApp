import prisma from "../prisma/client.js";
import {
  createReviewSchema,
  getOneReviewSchema,
  updateReviewSchema,
} from "../middlewares/validate.js";
import { getPaginationInfo, paginate } from "../utils/pagination.js";
import { deleteReviewService,updateReviewService,createReviewService } from "../services/reviewServices.js";
export async function getAllReviews(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const allReviews = await paginate(prisma.review, page, limit);
    const pagination = await getPaginationInfo(prisma.review, page, limit);

    res
      .status(200)
      .json({ message: "success", Data: allReviews, Pagination: pagination });
  } catch (error) {
    next(error);
  }
}

export async function getOneReview(req, res, next) {
  try {
    const _id = Number(req.params.id)

     await getOneReviewSchema.validateAsync({ _id });
    const reviewExist = await prisma.review.findUnique({ where:{
        id:_id
    } });
    res.status(200).json({ success: true, Data: reviewExist });
  } catch (error) {
    next(error);
  }
}

export async function createReview(req, res, next) {
  try {
    const { rating, comment, userId, hotelId } = req.body;
   await createReviewSchema.validateAsync({
      rating,
      comment,
      userId,
      hotelId,
    });

    const newReview = await createReviewService({
      rating,
      comment,
      userId,
      hotelId,
    });

    res.status(201).json({ success: true, Data: newReview });
  } catch (error) {
    next(error);
  }
}

export async function updateReview(req, res, next) {
  try {
    const _id = Number(req.params.id);
    const { rating, comment, userId, hotelId } = req.body;
     await updateReviewSchema.validateAsync({
      _id,
      rating,
      comment,
      userId,
      hotelId,
    });

    const reviewFields = await updateReviewService({
      _id,
      rating,
      comment,
      userId,
      hotelId,
    });

    res.status(200).json({
      success: true,
      message: "The review updated successfully",
      Data: reviewFields,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req, res, next) {
  try {
    const _id =Number(req.params.id);
     await getOneReviewSchema.validateAsync({ _id });

    const deletedReview = await deleteReviewService({ _id });
    res.status(200).json({
      success: true,
      message: "The review deleted successfully",
      Data: deletedReview,
    });
  } catch (error) {
    next(error);
  }
}
