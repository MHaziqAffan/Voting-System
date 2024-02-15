const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifytoken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(403).json({ auth: false, message: "No Tokken Provided" });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
          console.log(process.env.ACCESS_TOKEN_KEY);
          res.status(401).json({ auth: false, message: "Token Expired" });
        } else {
          req.id = user.id;
          next();
        }
      });
    }
  } catch (error) {
  }
};
module.exports = verifytoken;
