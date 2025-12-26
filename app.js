const express = require("express");
const { addEmployee } = require("./employeeService");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.post("/employee", async (req, res) => {
  const { emp_id, emp_name } = req.body;

  if (!emp_id || !emp_name) {
    return res.status(400).json({ error: "emp_id and emp_name are required" });
  }

  try {
    const result = await addEmployee(emp_id, emp_name);
    res.json({ status: result });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});


app.listen(PORT, () => console.log(`?? Server running on port ${PORT}`));
