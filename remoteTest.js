//const oracledb = require("oracledb");
// 👇 ADD THIS
//oracledb.initOracleClient({
  //libDir: "C:\\oracle\\instantclient_19_29" // change if needed
//});
const { getConnection } = require("./db");

async function testRemote() {
  let conn;
  try {
    /*conn = await oracledb.getConnection({
      user: "CBVMP_MASTER",
      password: "oracle1608",
      connectString: "172.16.26.151:1522/jbcpdb"
    });*/
	conn = await getConnection();

    console.log("✅ Connected to REMOTE Oracle 19c");

    const res = await conn.execute(`SELECT sysdate FROM dual`);
    console.log(res.rows);

  } catch (err) {
    console.error("❌ Remote connection error:", err);
  } finally {
    if (conn) await conn.close();
  }
}

testRemote();
