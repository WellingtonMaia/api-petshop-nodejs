const NotFound = require('../errors/not-found');
const model = require('../models/supplier-sequelize');

const ATTRIBUTES = ['id', 'company', 'category', 'createdAt'];

module.exports = {
  list() {
    return model.findAll({ raw: true});
  },

  insert(supplier) {
    return model.create(supplier);
  },

  async findById(id) {
    // const found = model.findByPk(id);
    const found = await model.findOne({
      where: {
        id: id
      }
    });

    if (!found) {
      throw new NotFound()
    }
    
    return found;
  },

  async update(id, supplier) {
    return await model.update(supplier, {
      where: { id: id }
    }); 
  },

  async delete(id) {
    return await model.destroy({
      where: { id: id }
    });
  }
}