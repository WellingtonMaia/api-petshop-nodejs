const Sequelize = require('sequelize');
const instance = require('../../database/index');
const defaultOptions = require('../defaultOptions');

const columns = {
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM('ração', 'briquedos'),
    allowNull: false,
  }
}

const options = defaultOptions('suppliers');

module.exports = instance.define('supplier', columns, options);