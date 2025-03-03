import {
  createPropertySchema,
  getonePropertySchema,
  updatePropertySchema,
} from "../middlewares/validate.js";
import { paginate, getPaginationInfo } from "../utils/pagination.js";
import prisma from "../prisma/client.js";
import {
  createPropertyService,
  deletePropertyService,
  updatePropertyService,
} from "../services/propertyServices.js";
export async function getAllProperties(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pagination = await getPaginationInfo(prisma.property, page, limit);
    const allProperties = await paginate(prisma.property, page, limit);
    res.status(200).json({
      message: "success",
      Data: allProperties,
      Pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
}

export async function createProperty(req, res, next) {
  try {
    const { name, description } = req.body;
    await createPropertySchema.validateAsync({
      name,
      description,
    });

    const newProperty = await createPropertyService({ name, description });

    res.status(200).json({ success: true, data: newProperty });
  } catch (error) {
    next(error);
  }
}

export async function getOneProperty(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getonePropertySchema.validateAsync({ _id });
    const result = await prisma.property.findUnique({ where: { id: _id } });
    res.status(200).json({ success: true, Data: result });
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(req, res, next) {
  try {
    const _id = Number(req.params.id);
    const { name, description } = req.body;
    await updatePropertySchema.validateAsync({
      _id,
      name,
      description,
    });

    const newProperty = await updatePropertyService({ _id, name, description });

    res.status(200).json({ success: true, Data: newProperty });
  } catch (error) {
    next(error);
  }
}

export async function deleteProperty(req, res, next) {
  try {
    const _id = Number(req.params.id);
    await getonePropertySchema.validateAsync({ _id });

    await deletePropertyService({ _id });
    res.status(200).json({ success: true, message: "Delete success" });
  } catch (error) {
    next(error);
  }
}
