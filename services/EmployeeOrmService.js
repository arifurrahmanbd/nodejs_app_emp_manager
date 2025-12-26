const AppDatabase = require("../db/AppDatabaseORM");
const Employee = require("../entities/Employee");

class EmployeeOrmService {
  /**
   * Create employee using TypeORM
   */
  async createEmployee(name, email) {
    // Ensure DB is initialized
    const dataSource = await AppDatabase.initialize();

    const employeeRepo = dataSource.getRepository(Employee);

    const emp = employeeRepo.create({ name, email });
    await employeeRepo.save(emp);

    console.log("✅ Employee saved:", emp);
    return emp;
  }
}

module.exports = EmployeeOrmService;
