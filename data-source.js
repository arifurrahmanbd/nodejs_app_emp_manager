require("dotenv").config();
const { DataSource } = require("typeorm");
const oracledb = require("oracledb");


// Thick mode windows
//oracledb.initOracleClient({
 // libDir: "C:\\oracle\\instantclient_19_29"
//});

// Thick mode linux
oracledb.initOracleClient({
  libDir: process.env.OCI_LIB_DIR || '/opt/oracle/instantclient_19_29'
});
const AppDataSource = new DataSource({
  type: "oracle",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT, // use host:port/serviceName
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*.js"],
  options: {
    autoCommit: true, // <--- this ensures each query commits automatically
  },
});

module.exports = { AppDataSource };
