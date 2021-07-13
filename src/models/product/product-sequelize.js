const Sequelize = require('sequelize');
const instance = require('../../database/index');
const defaultOptions = require('../defaultOptions');


const columns = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  supplier: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require('../supplier/supplier-sequelize'),
      key: 'id'
    }
  }
};

const options = defaultOptions('products');

module.exports = instance.define('product', columns, options);
