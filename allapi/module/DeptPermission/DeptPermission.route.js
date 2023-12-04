const express = require("express");
const router = express.Router();
const DeptController = require("./DeptPermission.controller");

router
.post('/create-permission', DeptController.createDATA)
.get('/permission-list-depthead/:dept_head_id/:dept_id', DeptController.getallpermissionList)
.get("/deskmodule-list/:id", DeptController.getdeskmodulelist)
.get('/privilage-list/:module_id/:dept_id', DeptController.getDeskprivilageList)
.get('/single-privilage-list/:access_by/:module_id', DeptController.singlePrevilageDetails)






module.exports = router;
