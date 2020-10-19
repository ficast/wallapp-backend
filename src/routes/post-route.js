"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/post-controller");
const authService = require("../services/auth-service");

router.get("/", controller.get);
router.post("/", controller.post);
router.put("/:id", authService.isAdmin, controller.put);
router.delete("/", authService.isAdmin, controller.delete);

module.exports = router;

// authService.isAdmin