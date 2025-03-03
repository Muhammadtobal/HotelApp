import prisma from "../prisma/client.js";
import { deleteImage,imagePath } from "../helpers/deleteingImages.js";
export async function createDestinationService({
  city,
  state,
  country,
  address,
  description,
}) {
  const result = await prisma.destination.create({
    data: {
      city,
      state,
      country,
      address,
      description,
    },
  });
  return result;
}

export async function updateDestinationService({
  _id,
  city,
  state,
  country,
  address,
  description,
}) {
  const destinationFields = {
    ...(city && { city }),
    ...(state && { state }),
    ...(country && { country }),
    ...(address && { address }),
    ...(description && { description }),
  };

  const result = await prisma.destination.update({
    where: { id: _id },
    data: destinationFields,
  });
  return result;
}

export async function deleteDestinationService({ _id }) {
  const hotels = await prisma.hotel.findMany({ where: { destinationId: _id } });
  hotels.forEach((hotel) => {
    if (hotel.images) {
      deleteImage(hotel.images, imagePath);
    }
  });
  await prisma.destination.delete({ where: { id: _id } });
}
