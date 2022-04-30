const Complements = require("../models/Complements");

const ComplimentsController = () => {
  const getComplimentskByUser = async (req, res) => {
    const { query } = req;
    //console.log(req);
    try {
      const compliments = await Complements.findOne({
        where: { userid: query.userid },
      });
      res.status(200).json(compliments);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };
  return {
    getComplimentskByUser,
  };
};

module.exports = ComplimentsController;
