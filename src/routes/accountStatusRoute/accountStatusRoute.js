const express = require("express");

const { accountStatsCtrl } = require("../../controllers/accountStatsCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");

const accountStatsRoute = express.Router();

accountStatsRoute.get("/", accountStatsCtrl);
module.exports = accountStatsRoute;