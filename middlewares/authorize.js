const constants = require("./../constants/constants");

const jwt = require("jsonwebtoken");

let verifyJWT = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token) {
    return constants.prepareJSONResponse(res, 401, 0, {
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      return constants.prepareJSONResponse(res, 500, 0, {
        auth: false,
        message: "Failed to authenticate token.",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
