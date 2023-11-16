const express = require("express");
const router = express.Router();
const ModuleController = require("./ModuleList.controller");

router

.post('/create', ModuleController.createDATA)
.get("/all-modules", ModuleController.getAllmodules)
.get("/module-list/:id", ModuleController.getModuleById)
module.exports = router;
