const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log({ err }, `msg: ${err.message}`);

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try again later",
  };

  // duplicate value, but should be unique, mongoose model validation failed => if an email is already used
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // invalid data entered => typo in email field
  if (err.name === "TypeError") {
    customError.msg = "invalid request, check your entered data";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // required data is not provided, mongoose model validation failed
  if (err.name === "ValidationError") {
    customError.msg = `Required value is missing for: ${Object.keys(
      err.errors
    ).join(", ")}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
module.exports = errorHandlerMiddleware;
