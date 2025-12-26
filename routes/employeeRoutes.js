const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");

const router = express.Router();
const controller = new EmployeeController();

router.post("/employee", controller.createEmployee);

module.exports = router;
