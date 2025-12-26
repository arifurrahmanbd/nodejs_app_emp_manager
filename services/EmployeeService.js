const oracledb = require("oracledb");
const OracleDataSource = require("../db/OracleDataSource");

class EmployeeService {
  async addEmployee(empId, empName) {
    const conn = await OracleDataSource.getConnection();

    try {
      const result = await conn.execute(
        `BEGIN
           add_employee(:p_id, :p_name, :p_result);
         END;`,
        {
          p_id: empId,
          p_name: empName,
          p_result: {
            dir: oracledb.BIND_OUT,
            type: oracledb.STRING,
            maxSize: 200
          }
        },
        { autoCommit: true }
      );

      return result.outBinds.p_result;
    } finally {
      await conn.close();
    }
  }
}

module.exports = EmployeeService;
