const express = require("express");
const router = express.Router();
const ModuleController = require("./ModuleList.controller");

router

.post('/create', ModuleController.createDATA)
.get("/all-modules", ModuleController.getAllmodules)
.get("/dept-permission-list", ModuleController.deptPermissionlist)
.get("/module-list/:id", ModuleController.getModuleById)
.get("/dept-list-mIdwise/:id", ModuleController.getdeptListByMid)
.get("/total-user", ModuleController.totalPermittedUser)
.get("/total-module", ModuleController.totalModule)
.get("/dept-head-pmodule-list/:id", ModuleController.getdeptmodulelist)
.get("/user-list/:id", ModuleController.getuserListBydeptid)
.get("/previlage-list", ModuleController.previlageList)



module.exports = router;
