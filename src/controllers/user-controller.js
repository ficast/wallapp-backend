"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/user-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");

const emailService = require("../services/email-service");

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, "Name should contain minimum of 3 characters");
  contract.isEmail(req.body.email, "Invalid email");
  contract.hasMinLen(req.body.password, 6, "Password must contain minimum of 6 characters");

  // If invalid
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ["user"],
    });

    emailService.send(
      req.body.email,
      "Wellcome to The Wall",
      global.EMAIL_TMPL.replace("{0}", req.body.name)
    );

    res.status(201).send({
      message: "User registration with success!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!user) {
      res.status(404).send({
        message: "Invalid user or password",
      });
      return;
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    });

    res.status(201).send({
      token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }

    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    });

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
