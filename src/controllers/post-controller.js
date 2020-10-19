"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/post-repository");
const azure = require("azure-storage");
const guid = require("guid");
const config = require("../config");

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
  contract.hasMinLen(
    req.body.title,
    3,
    "Title must contain at least 3 characters"
  );

  contract.hasMinLen(
    req.body.body,
    3,
    "Body must contain at least 3 characters"
  );

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    });
    res.status(201).send({
      message: "Post successfully created",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: "Post successfully updated",
    });
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: "Post successfully deleted",
    });
  } catch (e) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
