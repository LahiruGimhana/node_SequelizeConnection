const express = require('express');
const sequelize = require('./util/dbConnection');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');
const Order = require('./models/order');
const Customer = require('./models/customer');


const app = express();
const PORT = 3000; // Change to your desired port number

app.use(express.json());

// Define associations
Customer.hasMany(Order, {
  foreignKey: {
    name: 'customerId',
    allowNull: false,
  },
  onDelete: "CASCADE",
});


// // Add routes
// app.use(customerRoutes);
// app.use(orderRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

sequelize
  .query('CREATE SCHEMA IF NOT EXISTS testschema;')
  .then(() => sequelize.sync())
  // .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
