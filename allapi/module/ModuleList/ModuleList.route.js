const express = require("express");
const router = express.Router();
const ModuleController = require("./ModuleList.controller");

router
.get("/all-modules", ModuleController.getAllmodules);
module.exports = router;
