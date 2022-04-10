const bcrypt = require("bcrypt-nodejs");

const bcryptService = () => {
  const password = (user) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return hash;
  };

  const comparePassword = (pwd, hash) => bcrypt.compareSync(pwd, hash);

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
