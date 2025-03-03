import prisma from "../prisma/client.js";
export async function createBookingService({
  userId,
  hotelId,
  checkIn,
  checkOut,
  status,
}) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const differenceInMilliseconds = checkOutDate - checkInDate;

  const hotelExist = await prisma.hotel.findUnique({
    where: { id: Number(hotelId) },
  });

  if (!hotelExist) {
    throw new Error("Hotel not found");
  }

  const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

  const total = hotelExist.pricePerNight * differenceInDays;

  const newBooking = await prisma.booking.create({
    data: {
      userId: Number(userId),
      hotelId: Number(hotelId),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice: total,
      status,
    },
  });

  return newBooking;
}
export async function updateBookingService({
  _id,
  userId,
  hotelId,
  checkIn,
  checkOut,
  status,
}) {
  const bookingFields = {};

  let bookingExist = await prisma.booking.findUnique({
    where: { id: Number(_id) },
  });

  let total;

  
 
  if (userId) bookingFields.userId = Number(userId);
  let checkInDate =  new Date(checkIn) ;
  let checkOutDate =new Date(checkOut) ;
if(checkIn && checkOut ){
  
  if (checkInDate && checkOutDate && hotelId ) {
    const hotelExist=await prisma.hotel.findUnique({where:{id:Number(hotelId)}})
   
       bookingFields.checkIn = checkInDate;
       bookingFields.checkOut = checkOutDate;
   
       const differenceInDays = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
   
       if (differenceInDays < 1) {
         throw new Error("Booking must be at least one full day.");
       }
     if(hotelExist?.pricePerNight){
       total = hotelExist.pricePerNight * differenceInDays;
       bookingFields.totalPrice = parseInt(total.toFixed(2));}
     } else{
       throw new Error("ckeck the fileds of date should be nonEmpty and hotel Id")
     }
}

  if (status) bookingFields.status = status;

  const bookingUpdate = await prisma.booking.update({
    where: { id: Number(_id) },
    data: bookingFields,
  });
if(bookingFields === null){
  return bookingExist;
}
  return bookingUpdate;
}
