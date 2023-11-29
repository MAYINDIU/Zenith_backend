const express = require("express");
const router = express.Router();
const DeptController = require("./DeptPermission.controller");

router
.post('/create-permission', DeptController.createDATA)
.get('/permission-list-depthead/:dept_head_id/:dept_id', DeptController.getallpermissionList)
.get("/deskmodule-list/:id", DeptController.getdeskmodulelist)
.get('/privilage-list/:module_id/:access_by', DeptController.getDeskprivilageList)




module.exports = router;
