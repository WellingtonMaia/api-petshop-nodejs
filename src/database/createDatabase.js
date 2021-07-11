const TableModel = require('../models/supplier');

TableModel
  .sync()
  .then(() => console.log('table created with success'))
  .catch(console.log);