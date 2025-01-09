const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

module.exports = {
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

  closeDatabase: () => {},

  db: sequelize,
};

module.exports.moduleInitDatabase = (importedModule) => {
  if ("initDB" in importedModule) {
    importedModule.initDB(module.exports.db);
  }
};
