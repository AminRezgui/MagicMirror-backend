const Sequelize = require("sequelize");
const { Client } = require("pg");

const sequelize = new Sequelize(
  "postgres://ymrqyzcyynpksz:6d45e4775af9c6f56320d4cd71e3c16fdba69e4ee00986fee8d3db8a45d78347@ec2-34-248-169-69.eu-west-1.compute.amazonaws.com:5432/d6ib3b0ml2g47k",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
