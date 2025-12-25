const { AppDataSource } = require("./data-source");
const Employee = require("./entity/Employee");

async function main() {
  await AppDataSource.initialize();

  const employeeRepo = AppDataSource.getRepository("Employee");

  const emp = employeeRepo.create({ name: "Afrin", email: "afr@example.com" });
  await employeeRepo.save(emp);

  console.log("Employee saved:", emp);
}

main();
