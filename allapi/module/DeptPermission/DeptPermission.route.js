const express = require("express");
const router = express.Router();
const DeptController = require("./DeptPermission.controller");

router
.post('/create-permission', DeptController.createDATA)
.get('/permission-list-depthead/:id', DeptController.getallpermissionList)
.get("/deskmodule-list/:id", DeptController.getdeskmodulelist)





module.exports = router;
