const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ Error: "No access Token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ Error: "Invalid token" });
    } else {
      req.user = user;
      next();
    }
  });
};
module.exports = verifyToken;
