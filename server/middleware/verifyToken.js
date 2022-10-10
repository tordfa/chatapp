const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    let token = req.cookies.xtoken;
    if (!token) {
      return res.status(403).send({ message: "No token provided!" , isLoggedIn: false});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" , isLoggedIn: false});
      }
      req.userId = decoded.id;
      next();
    });
  };

  module.exports = verifyToken;