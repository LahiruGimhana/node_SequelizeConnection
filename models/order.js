const Sequelize = require("sequelize");
const sequelize = require("../util/dbConnection");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { schema: "testschema" }
);



module.exports = Order;
