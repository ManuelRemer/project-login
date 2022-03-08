const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(999).json({ msg: err.message });
};
module.exports = errorHandlerMiddleware;
