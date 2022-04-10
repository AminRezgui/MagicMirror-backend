const jwt = require("jsonwebtoken");

const authService = () => {
  const issue = (payload) => jwt.sign(payload, "secret");

  return {
    issue,
  };
};

module.exports = authService;
