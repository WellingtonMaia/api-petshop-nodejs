const models = [
  require('../models/supplier/supplier-sequelize'),
  require('../models/product/product-sequelize')
]

const createTables = async () => {
  models.forEach( async (model, index) => {
   await model.sync();
  });
}

createTables();