import { deleteImage, imagePath } from "../helpers/deleteingImages.js";
import prisma from "../prisma/client.js";

export async function createHotelService({
  name,
  description,
  imageFile,
  pricePerNight,

  destinationId,

  propertyId,
}) {
  if (!imageFile) {
    throw new Error("The image cannot be null");
  }

  const newHotel = await prisma.hotel.create({
    data: {
      name,
      description,
      images: imageFile,
      pricePerNight: Number(pricePerNight),
      destination: {
        connect: { id: Number(destinationId) },
      },
      property: {
        connect: { id: Number(propertyId) },
      },
    },
  });

  return newHotel;
}
export async function deleteHotelService({ _id }) {
  const hotelDelete = await prisma.hotel.findUnique({
    where: {
      id: _id,
    },
  });

  if (hotelDelete?.images) {
    deleteImage(hotelDelete.images, imagePath);
  }

  return await prisma.hotel.delete({
    where: {
      id: _id,
    },
  });
}

export async function updateHotelService({
  _id,
  name,
  description,
  pricePerNight,
  newImage,
  destinationId,

  propertyId,
}) {
  const hotelExist = await prisma.hotel.findUnique({ where: { id: _id } });

  if (!newImage) {
    throw new Error("the image null");
  } else {
    deleteImage(hotelExist.images, imagePath);
  }

  const hotelFields = {
    ...(name && { name }),
    ...(description && { description }),
    ...(pricePerNight && { pricePerNight }),
    ...(destinationId && { destination: { connect: { id: Number(destinationId) } } }),

    ...(propertyId && { property: { connect: { id: Number(propertyId) } } }),
    images: newImage,
  };
  const updatedHotel = await prisma.hotel.update({
    where: { id: _id },
    data: hotelFields,
  });

  return updatedHotel;
}
