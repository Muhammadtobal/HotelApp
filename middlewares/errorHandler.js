const errorHandler = (err, req, res, next) => {
  console.error("Error Handler:", err);

  if (err.isJoi || err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.details?.[0]?.message || "Validation error",
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
