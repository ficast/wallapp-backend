"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
const authService = require("../services/auth-service");

router.post("/", controller.post);
router.get("/", controller.get);
router.post("/authenticate", controller.authenticate);
router.post("/refresh-token", authService.authorize, controller.refreshToken);
router.delete("/delete", authService.isAdmin, controller.delete);

module.exports = router;
