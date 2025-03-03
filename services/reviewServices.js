import prisma from "../prisma/client.js";

export async function createReviewService({
  rating,
  comment,
  userId,
  hotelId,
}) {
  const newReview = await prisma.review.create({
    data: {
      rating,
      comment,
      user: {
        connect: { id: Number(userId )},
      },
      hotel: {
        connect: { id: Number(hotelId) },
      },
    },
  });
  return newReview;
}

export async function updateReviewService({
  _id,
  rating,
  comment,
  userId,
  hotelId,
}) {
  const exist = await prisma.user.findUnique({where:{id:(userId)}})
  if(!exist){
    throw new Error("not found")
  }
  const updateFileds= {
    ...(rating && { rating }),
    ...(comment && { comment }),
    ...(userId && { user: { connect: { id: Number(userId) } } }),
    ...(hotelId && { hotel: { connect: { id: Number(hotelId) } } }),
  }
  const newReview = await prisma.review.update({
    where: { id: _id },
    data:updateFileds,
  });
  return newReview;
}
export async function deleteReviewService({ _id }) {
  return await prisma.review.delete({ where: { id: _id } });
}
