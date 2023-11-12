const express = require("express");
const router = express.Router();
const DeptController = require("./Dept.controller");

router
.get("/department-head-list", DeptController.getAllDepartmentHead)
.get("/department-head/:id", DeptController.getDepartmentyById)
module.exports = router;
