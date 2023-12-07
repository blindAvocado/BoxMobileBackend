import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");

      if (decoded.role === "ADMIN") {
        req.userId = decoded._id;
        next();
      }
    } catch (err) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};
