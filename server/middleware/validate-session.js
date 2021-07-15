const jwt = require("jsonwebtoken");
const { UserModel } = require("../Blue-Badge/Eleven-Journal/server/models");

const validateSession = async (req, res, next) => {
  if (req.method == "OPTIONS") {
    next();
  } else if (req.headers.authorization) {
    const { authorization } = req.headers;
    const payload = authorization
      ? jwt.verify(authorization, "secret-key")
      : undefined;
    if (payload) {
      let foundUser = await UserModel.findOne({
        where: {
          id: payload.id,
        },
      });
      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        res.status(400).send({
          message: "Not Authorized.",
        });
      }
    } else {
      res.status(401).send({
        message: "Invalid Token",
      });
    }
  } else {
    res.status(500).send({
      message: "Forbidden",
    });
  }
};
