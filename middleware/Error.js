const Error = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error.";
  return res.status(error.statusCode).json({
    message: error.message,
    error: error,
  });
};

export default Error;
