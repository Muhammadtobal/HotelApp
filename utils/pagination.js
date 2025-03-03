export async function paginate(model, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const data = await model.findMany({
    skip,
    take: limit,
  });

  return data;
}

export async function getPaginationInfo(model, page = 1, limit = 10) {
  const totalItems = await model.count();
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage: page,
    limit: limit,
  };
}

export default { paginate, getPaginationInfo };
