const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Employee",
  tableName: "EMPLOYEE",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: String
    },
    email: {
      type: String,
      nullable: true
    }
  }
});
