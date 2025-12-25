const oracledb = require("oracledb"); // yes, even if db.js already imported it
const { getConnection } = require("./db");

async function addEmployee(empId, empName) {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `BEGIN
         add_employee(:p_emp_id, :p_emp_name, :p_result);
       END;`,
      {
        p_emp_id: empId,
        p_emp_name: empName,
        p_result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 200 }
      }
    );

    return result.outBinds.p_result;
  } finally {
    await conn.close();
  }
}

module.exports = { addEmployee };
