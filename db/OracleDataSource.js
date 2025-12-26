require("dotenv").config();
const oracledb = require("oracledb");
const os = require("os");

class OracleDataSource {
  static initialized = false;

  static init() {
    if (this.initialized) return;

    const isLinux = os.platform() === "linux";
    const libDir = isLinux
      ? process.env.ORACLE_CLIENT_LIB_DIR_LINUX
      : process.env.ORACLE_CLIENT_LIB_DIR_WINDOWS;

    if (libDir) {
      oracledb.initOracleClient({ libDir });
      console.log("✅ Oracle Thick Client initialized:", libDir);
    }

    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    this.initialized = true;
  }

  static async getConnection() {
    this.init();

    return await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT
    });
  }
}

module.exports = OracleDataSource;
