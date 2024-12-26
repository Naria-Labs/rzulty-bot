const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

module.exports = {
  ModelDef: class {
    constructor(name, fields, options) {
      (this.name = name), (this.attributes = fields), (this.options = options);
    }
  },

  initDatabase: (name = "data.sqlite3") => {
    try {
      sequelize.authenticate();
      console.log("Database connection successful");
      return true;
    } catch (error) {
      console.log("Unable to connect to the database: ", error);
      return false;
    }
  },

  registerModuleModels: (importedModule) => {
    if ("models" in importedModule) {
      for (const model of importedModule.models) {
        sequelize.define(model.name, model.attributes, model.options);
      }
    }
    if ("commands" in importedModule) {
      for (const command of importedModule.commands) {
        if ("initFromDB" in command) {
          command.initFromDB();
        }
      }
    }
  },

  closeDatabase: () => {},

  db: sequelize,
};
