require("dotenv").config();
const oracledb = require("oracledb");


// Thick mode windows
//oracledb.initOracleClient({
  //libDir: "C:\\oracle\\instantclient_19_29"
//});

// Thick mode linux
oracledb.initOracleClient({
  libDir: process.env.OCI_LIB_DIR || '/opt/oracle/instantclient_19_29'
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT
  });
}

module.exports = { getConnection };
