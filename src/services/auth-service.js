"use strict";
const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
};

exports.decodeToken = (token) => {
  const data = jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Restricted Access",
    });
  } else {
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: "Invalid Token",
        });
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Invalid Token",
    });
  } else {
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: "Invalid Token",
        });
      } else {
        if (decoded.roles.includes("admin")) {
          next();
        } else {
          res.status(403).json({
            message: "Restricted Access",
          });
        }
      }
    });
  }
};
