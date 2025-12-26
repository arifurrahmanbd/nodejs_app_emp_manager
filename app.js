require("dotenv").config();
const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(express.json());

app.use("/api", employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
