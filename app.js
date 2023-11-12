const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const DepartmentRoute = require("./allapi/module/DeptHead/Dept.route");

// Home page
app.get("/", (req, res) => {
  res.send(`Wow..!!! Route is Running`);
});



app.use("/api", DepartmentRoute);

module.exports = app;