const model = require('../models/product/product-sequelize')
const instance = require('../database/index')
const NotFound = require('../errors/not-found')

module.exports = {
  list (supplierId) {
    return model.findAll({
      where: {
        supplier: supplierId
      },
      raw: true
    })
  },

  insert (product) {
    return model.create(product)
  },

  async findById (id, supplier) {
    const found = await model.findOne({
      where: {
        id: id,
        supplier: supplier
      },
      raw: true
    })

    if (!found) {
      throw new NotFound('Product')
    }

    return found
  },

  async update (id, supplierId, product) {
    return await model.update(product, {
      where: {
        id: id,
        supplier: supplierId
      }
    })
  },

  delete (id, supplier) {
    return model.destroy({
      where: {
        id: id,
        supplier: supplier
      }
    })
  },

  async decreaseStock (id, supplierId, field, newAmount) {
    return instance.transaction(async transaction => {
      const product = await model.findOne({
        where: {
          id: id,
          supplier: supplierId
        }
      })

      product[field] = product[field] - newAmount

      await product.save()

      return product
    })
  }
}
