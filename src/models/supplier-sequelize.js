const Sequelize = require('sequelize');
const instance = require('../database/index');

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

const options = {
 freezeTableName: true,
 tableName: 'suppliers',
 timestamps: true,
 version: 'version'
}

module.exports = instance.define('supplier', columns, options);