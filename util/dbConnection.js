const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config()

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT,
});

module.exports = sequelize;
