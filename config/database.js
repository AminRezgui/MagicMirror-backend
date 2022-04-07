const Sequelize = require("sequelize");
const { Pool, Client } = require("pg");
const path = require("path");

const connection = require("./connection");
const client = new Client({
  connectionString:
    "postgres://ymrqyzcyynpksz:6d45e4775af9c6f56320d4cd71e3c16fdba69e4ee00986fee8d3db8a45d78347@ec2-34-248-169-69.eu-west-1.compute.amazonaws.com:5432/d6ib3b0ml2g47k",
  ssl: {
    rejectUnauthorized: false,
  },
});
const database = new Sequelize(
  connection.database,
  connection.username,
  connection.password,

  {
    host: connection.host,
    port: connection.port,
    dialect: connection.dialect,
    sslmode: "require",
    define: {
      timestamps: false,
    },
  }
);

module.exports = client;
