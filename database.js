const { Sequelize } = require("sequelize");

var toClose = [];

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.sqlite3",
});

module.exports = {
  initDatabase: () => {
    try {
      sequelize.authenticate();
      console.log("Database connection successful");
      return true;
    } catch (error) {
      console.log("Unable to connect to the database: ", error);
      return false;
    }
  },

  closeDatabase: () => {
    for (initializedModule of toClose) {
      initializedModule.closeDB();
    }
  },

  db: sequelize,
};

module.exports.moduleInitDatabase = (importedModule) => {
  if ("initDB" in importedModule) {
    importedModule.initDB(module.exports.db);
    toClose.push(importedModule);
  }
};
