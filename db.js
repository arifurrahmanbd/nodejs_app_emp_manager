
require('dotenv').config();
const path = require('path');
const os = require('os');
const oracledb = require('oracledb');

// Auto-detect environment
const isLinux = os.platform() === 'linux';
console.log("Current Environment:", isLinux ? "linux" : "windows");

try {
  oracledb.initOracleClient({ libDir: isLinux ? process.env.ORACLE_CLIENT_LIB_DIR_LINUX : process.env.ORACLE_CLIENT_LIB_DIR_WINDOWS });
  console.log("Oracle client initialized.");
} catch (err) {
  console.error("Error initializing Oracle client:", err);
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT
  });
}

module.exports = { getConnection };
