const EmployeeService = require("../services/EmployeeService");

class EmployeeController {
  constructor() {
    this.employeeService = new EmployeeService();

    // bind methods
    this.createEmployee = this.createEmployee.bind(this);
  }

  async createEmployee(req, res) {
    const { emp_id, emp_name } = req.body;

    if (!emp_id || !emp_name) {
      return res.status(400).json({ error: "emp_id and emp_name required" });
    }

    try {
      const status = await this.employeeService.addEmployee(emp_id, emp_name);
      res.json({ status });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = EmployeeController;
