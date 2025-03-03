import joi from "joi";
import prisma from "../prisma/client.js";

const checkIfExists = async (id, model, label) => {
  const exists = await prisma[model].findUnique({
    where: {
      id: id,
    },
  });
  if (!exists) {
    console.log(`🚨 ${label} with ID ${id} not found`); // تتبع الخطأ
    throw new Error(`${label} with ID ${id} not found`);
  }
};
// ----- Auth -----
const singUpSchema = joi.object({
  isAdmin: joi.boolean().optional(),
  name: joi.string().required(),
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
});
const LogInSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
});
const getOneUserSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "user", "User");
    }),
});
const updateUserSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "user", "User");
    }),
  email: joi
    .string()
    .min(6)
    .max(60)
    .optional()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: joi
    .string()
    .optional()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
  isAdmin: joi.boolean().optional(),
  name: joi.string().optional(),
});

// ----- Property -----

const createPropertySchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});
const getonePropertySchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "property", "Property");
    }),
});
const updatePropertySchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "property", "Property");
    }),
  name: joi.string().optional(),
  description: joi.string().optional(),
});

// ----- Destination -----

const creatDestinationSchema = joi.object({
  city: joi
    .string()
    .required()
    .regex(/^\S+(?:\s+\S+){0,4}$/) // من 2 إلى 5 كلمات
    .messages({
      "string.pattern.base": "The city should contain only 1 to 5 words",
    }),

  state: joi
    .string()
    .required()
    .regex(/^\S+(?:\s+\S+){0,4}$/) // من 2 إلى 5 كلمات
    .messages({
      "string.pattern.base": "The state must contain only 1 to 5 words",
    }),

  country: joi
    .string()
    .required()
    .regex(/^\S+(?:\s+\S+){0,3}$/) // من 1 إلى 4 كلمات
    .messages({
      "string.pattern.base": "Country should contain only 1 to 4 words",
    }),

  address: joi
    .string()
    .required()
    .regex(/^\S+(?:\s+\S+){1,9}$/) // من 5 إلى 10 كلمات
    .messages({
      "string.pattern.base": "Title should only contain 2 to 10 words",
    }),

  description: joi
    .string()
    .required()
    .regex(/^\S+(?:\s+\S+){2,49}$/)
    .messages({
      "string.pattern.base": "Description should only contain 3 to 50 words",
    }),
});
const updateDestinationSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "destination", "Destination");
    }),
  city: joi
    .string()
    .optional()
    .regex(/^\S+(?:\s+\S+){0,4}$/) // من 2 إلى 5 كلمات
    .messages({
      "string.pattern.base": "The city should contain only 1 to 5 words",
    }),

  state: joi
    .string()
    .optional()
    .regex(/^\S+(?:\s+\S+){0,4}$/) // من 2 إلى 5 كلمات
    .messages({
      "string.pattern.base": "The state must contain only 1 to 5 words",
    }),

  country: joi
    .string()
    .optional()
    .regex(/^\S+(?:\s+\S+){0,3}$/) // من 1 إلى 4 كلمات
    .messages({
      "string.pattern.base": "Country should contain only 1 to 4 words",
    }),

  address: joi
    .string()
    .optional()
    .regex(/^\S+(?:\s+\S+){1,9}$/) // من 5 إلى 10 كلمات
    .messages({
      "string.pattern.base": "address should only contain 2 to 10 words",
    }),

  description: joi
    .string()
    .optional()
    .regex(/^\S+(?:\s+\S+){2,49}$/)
    .messages({
      "string.pattern.base": "Description should only contain 3 to 50 words",
    }),
    hotels: joi.any()
});
const getOneDestinationSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "destination", "Destination");
    }),
});

// ----- Hotels -----

const createHotelSchema = joi.object({
  name: joi.string().required(), // اسم الفندق (مطلوب)
  description: joi.string().optional(), // وصف الفندق (اختياري)

  // التحقق من وجود `locationId` في `destinationModel`
  destinationId: joi
    .number()
    
    .required()
    .external(async (value) => {
      await checkIfExists(value, "destination", "destination");
    }),

  // التحقق من وجود `propertyId` في `propertyModel`
  propertyId: joi
    .number()
   
    .required()
    .external(async (value) => {
      await checkIfExists(value, "property", "Property");
    }),

  pricePerNight: joi.number().required(), // السعر لكل ليلة (مطلوب)
  average_rating: joi.number().optional(), // التقييم المتوسط (اختياري)
});
const getOneHotelSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "hotel", "Hotel");
    }),
});
const updateHotelSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "hotel", "Hotels");
    }),
  name: joi.string().optional(),
  description: joi.string().optional(),
  destinationId: joi
    .number()
     // طول 24 حرفًا لـ ObjectId
    .optional()
    .external(async (value) => {
      if (value)
      await checkIfExists(value, "destination", "Location");
    return value
    }),

  propertyId: joi
    .number()
    .optional()
    .external(async (value) => {
      if (value) await checkIfExists(value, "property", "Property");
      return value;
    }),

    images: joi.string()
    .optional()
    .min(1)
    .messages({
      "string.empty": "حقل الصور لا يمكن أن يكون فارغًا",
      "string.min": "يجب أن يحتوي على حرف واحد على الأقل",
    }),
  pricePerNight: joi.number().optional(),
});

// ----- Booking -----


// ✅ دالة التحقق مما إذا كان التاريخ صالحًا فعليًا
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return false; // تحقق من أن التاريخ ليس NaN

  const [year, month, day] = dateString.split("-").map(Number);
  const lastDayOfMonth = new Date(year, month, 0).getDate(); // احصل على آخر يوم في الشهر الحقيقي

  return day > 0 && day <= lastDayOfMonth;
};

// ✅ دالة لإرجاع تاريخ اليوم بدون توقيت
const getCurrentDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// ✅ تعريف مخطط التحقق باستخدام joi
const createBookingSchema = joi.object({
  userId: joi.number()
    .required()
    .external(async (value) => {
      if (value) await checkIfExists(value, "user", "User");
      return value;
    }),
  hotelId: joi.number()
    .required()
    .external(async (value) => {
      if (value) await checkIfExists(value, "hotel", "Hotel");
      return value;
    }),
  checkIn: joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // تأكد من أن التنسيق YYYY-MM-DD
    .required()
    .custom((value, helpers) => {
      if (!isValidDate(value)) {
        return helpers.error("date.invalid");
      }
      if (new Date(value) < getCurrentDate()) {
        return helpers.error("date.greater");
      }
      return value;
    })
    .messages({
      "date.invalid": "Invalid checkIn date format.",
      "date.greater": "The checkIn should be in the present or future.",
    }),

  checkOut: joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) 
    .required()
    .custom((value, helpers) => {
      const data = helpers.state.ancestors[0];

      if (!data.checkIn) return value; 

      if (!isValidDate(value)) {
        return helpers.error("date.invalid");
      }

      const checkInDate = new Date(data.checkIn);
      const checkOutDate = new Date(value);

      checkInDate.setHours(0, 0, 0, 0);
      checkOutDate.setHours(0, 0, 0, 0);

      if (checkOutDate <= checkInDate) {
        return helpers.error("date.invalidOrder");
      }

      const oneDayLater = new Date(checkInDate);
      oneDayLater.setDate(oneDayLater.getDate() + 1);

      if (checkOutDate < oneDayLater) {
        return helpers.error("date.minOneDay");
      }

      return value;
    })
    .messages({
      "date.invalid": "Invalid checkOut date format.",
      "date.invalidOrder": "The checkOut should be after checkIn.",
      "date.minOneDay": "The checkOut should be at least one day after checkIn.",
    }),

  status: joi.string().optional().valid("confirmed", "pending", "cancelled"),
});
const updateBookingSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      if(value)
      await checkIfExists(value, "booking", "Booking");
        return value
    }),
  userId: joi
    .number()
    .optional()
    .external(async (value) => {
      if (value) await checkIfExists(value, "user", "User");
    }),
  hotelId: joi
    .number()
    .optional()
    .external(async (value) => {
      if (value) await checkIfExists(value, "hotel", "Hotel");
    }),
    checkIn: joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) 
    .optional()
    .custom((value, helpers) => {
      if (!isValidDate(value)) {
        return helpers.error("date.invalid");
      }
      if (new Date(value) < getCurrentDate()) {
        return helpers.error("date.greater");
      }
      return value;
    })
    .messages({
      "date.invalid": "Invalid checkIn date format.",
      "date.greater": "The checkIn should be in the present or future.",
    }),

  checkOut: joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // تأكد من أن التنسيق YYYY-MM-DD
    .optional()
    .custom((value, helpers) => {
      const data = helpers.state.ancestors[0];

      if (!data.checkIn) return value; // تجاوز التحقق إذا لم يكن هناك checkIn

      if (!isValidDate(value)) {
        return helpers.error("date.invalid");
      }

      const checkInDate = new Date(data.checkIn);
      const checkOutDate = new Date(value);

      checkInDate.setHours(0, 0, 0, 0);
      checkOutDate.setHours(0, 0, 0, 0);

      if (checkOutDate <= checkInDate) {
        return helpers.error("date.invalidOrder");
      }

      const oneDayLater = new Date(checkInDate);
      oneDayLater.setDate(oneDayLater.getDate() + 1);

      if (checkOutDate < oneDayLater) {
        return helpers.error("date.minOneDay");
      }

      return value;
    })
    .messages({
      "date.invalid": "Invalid checkOut date format.",
      "date.invalidOrder": "The checkOut should be after checkIn.",
      "date.minOneDay": "The checkOut should be at least one day after checkIn.",
    }),

  status: joi.string().optional().valid("confirmed", "pending", "cancelled"),
});

const getOneBookingSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "booking", "Booking");
    }),
});

// ----- Review -----

const createReviewSchema = joi.object({
  hotelId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "hotel", "Hotels");
    }),
  userId: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "user", "User");
    }),
  rating: joi.number().required().min(1).max(5),
  comment: joi.string().required(),
});
const getOneReviewSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      if(value)
      await checkIfExists(value, "review", "Rveiew");
    return value
    }),
});
const updateReviewSchema = joi.object({
  _id: joi
    .number()
    .required()
    .external(async (value) => {
      await checkIfExists(value, "review", "Review");
    }),
  hotelId: joi
    .number()
    .optional()
    .external(async (value) => {
      if (value) {await checkIfExists(value, "hotel", "Hotels")};
      return value;
    }),
  userId: joi
    .number()
    .optional()
    .external(async (value) => {
      if (value) {
        await checkIfExists(value, "hotel", "User");
      }
      return value;
    }),
  rating: joi.number().optional().min(1).max(5),
  comment: joi.string().optional(),
});

// ---- Payment ----

const createPaymentSchema = joi.object({
  bookingId: joi
    .number()
    .required()
    .external(async (value) => {
      if(value)
      await checkIfExists(value, "booking", "Booking");
    return value
    }),
});

export {
  singUpSchema,
  LogInSchema,
  getOneUserSchema,
  createPropertySchema,
  updateUserSchema,
  getonePropertySchema,
  updatePropertySchema,
  creatDestinationSchema,
  updateDestinationSchema,
  getOneDestinationSchema,
  createHotelSchema,
  getOneHotelSchema,
  updateHotelSchema,
  createBookingSchema,
  updateBookingSchema,
  getOneBookingSchema,
  createReviewSchema,
  getOneReviewSchema,
  updateReviewSchema,
  createPaymentSchema,
};
