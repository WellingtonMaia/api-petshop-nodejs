const FieldInvalid = require('../../errors/field-invalid')
const FieldsNotFilled = require('../../errors/fields-not-filled')
const repository = require('./../../repositories/product-repository')

class Product {
  constructor (
    { id, title, price, stock, supplier, createdAt, updatedAt, version }
  ) {
    this.id = id
    this.title = title
    this.price = price
    this.stock = stock
    this.supplier = supplier
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.version = version
  }

  setAmount (amount) {
    this.amount = amount
  }

  async create () {
    const data = Object.assign(this.returnDataValid(), { stock: this.stock })
    const result = await repository.insert(data)
    this.setDataProduct(result)
  }

  async findById () {
    const product = await repository.findById(this.id, this.supplier)
    this.setDataProduct(product)
  }

  async update () {
    await repository.findById(this.id, this.supplier)

    const dataToUpdate = {}

    if (typeof this.title === 'string' && this.title.length > 0) {
      dataToUpdate.title = this.title
    }

    if (typeof this.title === 'number' && this.price > 0) {
      dataToUpdate.price = this.price
    }

    if (typeof this.stock === 'number') {
      dataToUpdate.stock = this.stock
    }

    if (Object.keys(dataToUpdate).length === 0) {
      throw new FieldsNotFilled()
    }

    await repository.update(this.id, this.supplier, dataToUpdate)
  }

  async delete () {
    await repository.findById(this.id, this.supplier)
    await repository.delete(this.id, this.supplier)
  }

  async decreaseStock () {
    await repository.findById(this.id, this.supplier)
    await repository.decreaseStock(this.id, this.supplier, 'stock', this.amount)
  }

  returnDataValid () {
    const fields = ['supplier', 'title', 'price']
    const dataToUpdate = { }
    const fieldsEmpties = []
    fields.forEach(field => {
      const value = this[field]
      if ((typeof value === 'string' || typeof value === 'number') &&
        String(value).length > 0) {
        dataToUpdate[field] = value
      } else {
        fieldsEmpties.push(field)
      }
    })

    if (Object.keys(dataToUpdate).length !== fields.length) {
      throw new FieldInvalid(fieldsEmpties)
    }

    return dataToUpdate
  }

  setDataProduct (product) {
    this.id = product.id
    this.title = product.title
    this.price = product.price
    this.stock = product.stock
    this.createdAt = product.createdAt
    this.updatedAt = product.updatedAt
    this.version = product.version
  }
}

module.exports = Product
