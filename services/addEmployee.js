const EmployeeOrmService = require("./EmployeeOrmService");

(async () => {
  const service = new EmployeeOrmService();
  await service.createEmployee("Afrin", "afr@example.com");
})();
