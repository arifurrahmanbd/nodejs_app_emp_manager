require("dotenv").config();

const { DataSource } = require("typeorm");
const oracledb = require("oracledb");
const os = require("os");
const path = require("path");

class AppDatabase {
  static initialized = false;
  static dataSource = null;

  /**
   * Initialize Oracle Thick Client
   */
  static initOracleClient() {
    if (this.initialized) return;

    const isLinux = os.platform() === "linux";
    console.log("Current Environment:", isLinux ? "linux" : "windows");

    const libDir = isLinux
      ? process.env.ORACLE_CLIENT_LIB_DIR_LINUX
      : process.env.ORACLE_CLIENT_LIB_DIR_WINDOWS;

    if (!libDir) {
      throw new Error("Oracle client library path is not defined");
    }

    try {
      oracledb.initOracleClient({ libDir });
      oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
      console.log("✅ Oracle client initialized:", libDir);
      this.initialized = true;
    } catch (err) {
      console.error("❌ Oracle client initialization failed:", err);
      throw err;
    }
  }

  /**
   * Create & return TypeORM DataSource
   */
  static getDataSource() {
    if (this.dataSource) {
      return this.dataSource;
    }

    this.initOracleClient();

    this.dataSource = new DataSource({
      type: "oracle",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT,
      synchronize: true,
      logging: false,
      entities: [path.join(__dirname, "../entities/*.js")],
      options: {
        autoCommit: true
      }
    });

    return this.dataSource;
  }

  /**
   * Initialize DB connection
   */
  static async initialize() {
    const ds = this.getDataSource();

    if (!ds.isInitialized) {
      await ds.initialize();
      console.log("✅ Database connected");
    }

    return ds;
  }
}

module.exports = AppDatabase;
