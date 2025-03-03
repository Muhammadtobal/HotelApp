import prisma from "../prisma/client.js";
import { imagePath,deleteImage } from "../helpers/deleteingImages.js";
export async function createPropertyService({ name, description, hotels }) {
  const result = await prisma.property.create({ data: { description, name } });
  return result;
}
export async function updatePropertyService({ _id, name, description }) {
  const result = await prisma.property.update({
    where: { id: _id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
    },
  });
  return result;
}
export async function deletePropertyService({_id}){
  const hotels = await prisma.hotel.findMany({
    where: { propertyId: _id },
  });

  hotels.forEach((hotel) => {
    if (hotel.images) {
      deleteImage(hotel.images, imagePath);
    } else {
      console.log(` Missing image data for hotel ID: ${hotel.id}`);
    }
  });
  await prisma.property.delete({ where: { id: _id } });

}