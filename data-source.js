require('dotenv').config();
const { DataSource } = require("typeorm");
const oracledb = require("oracledb");
const os = require("os");
const path = require("path");

// Detect OS
const isLinux = os.platform() === "linux";

console.log("Current Environment:", isLinux ? "linux" : "windows");

try {
  oracledb.initOracleClient({ libDir: isLinux ? process.env.ORACLE_CLIENT_LIB_DIR_LINUX : process.env.ORACLE_CLIENT_LIB_DIR_WINDOWS });
  console.log("Oracle client initialized.");
} catch (err) {
  console.error("Error initializing Oracle client:", err);
}
// Auto-commit is recommended for DML if you want changes persisted immediately
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const AppDataSource = new DataSource({
  type: "oracle",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT, // host:port/serviceName
  synchronize: true, // auto-create tables from entities
  logging: false,
  entities: [path.join(__dirname, "entity/*.js")],
  options: {
    autoCommit: true, // ensures inserts/updates are committed automatically
  },
});

module.exports = { AppDataSource };
