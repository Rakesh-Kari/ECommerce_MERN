const asyncErrorHandler = (passedFunc) => {
  return (req, res, next) => {
    passedFunc(req, res, next).catch((err) => next(err));
  };
};

export default asyncErrorHandler;
