const Sequelize = require("sequelize");
const sequelize = require("../util/dbConnection");
const Order = require('./order');

const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { schema: "testschema" }
);



module.exports = Customer;
