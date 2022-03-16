const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("../errors");

const authenticationMW = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, userDisplayName } = decoded;
    req.user = { userId, userDisplayName };
    next();
  } catch (error) {
    throw new AuthenticationError("Not authorized to access this route");
  }
};

module.exports = authenticationMW;
