const database = require("../../config/database");

const dbService = () => {
  const authenticateDB = () => database.connect();

  const start = async () => {
    try {
      await authenticateDB();
      console.log("starting dev ...");
    } catch (err) {
      return errorDBStart(err);
    }
  };

  return {
    start,
  };
};

module.exports = dbService;
