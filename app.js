const express = require("express");
const { addEmployee } = require("./employeeService");

const app = express();
app.use(express.json());

app.post("/employee", async (req, res) => {
  const { emp_id, emp_name } = req.body;

  if (!emp_id || !emp_name) {
    return res.status(400).json({ error: "emp_id and emp_name are required" });
  }

  try {
    const result = await addEmployee(emp_id, emp_name);
    res.json({ status: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
