const errorMiddelware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  console.log(err);

  if (err.code === 11000) {
    err.message = "Duplicate Error";
    err.statusCode = 500;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddelware;
