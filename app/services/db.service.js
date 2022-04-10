const database = require("../../config/database");

const dbService = () => {
  const authenticateDB = () => database.authenticate();

  const start = async () => {
    try {
      await authenticateDB();
      console.log("starting dev ...");
    } catch (err) {
      console.log("cannot start db !! error: ", err);
      return;
    }
  };

  return {
    start,
  };
};

module.exports = dbService;
