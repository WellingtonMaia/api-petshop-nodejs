const FieldInvalid = require('../errors/field-invalid');
const repository = require('./../repositories/supplier-repository');

class Supplier {
  constructor({
    id, company, email, category, createdAt, 
    updatedAt, version
  }) {
    this.id = id; 
    this.company = company; 
    this.email = email; 
    this.category = category; 
    this.createdAt = createdAt; 
    this.updatedAt = updatedAt; 
    this.version = version;
  }

  async add() {
    const dataToUpdate = await this.returnDataValid()
    console.log(dataToUpdate);
    const result = await repository.insert(dataToUpdate);

    this.id = result.id;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    this.version = result.version;
  }  

  async findById() {
    const find = await repository.findById(this.id);
    this.company = find.company; 
    this.email = find.email; 
    this.category = find.category; 
    this.createdAt = find.createdAt; 
    this.updatedAt = find.updatedAt; 
    this.version = find.version;
  }

  async update() {
    await repository.findById(this.id);
    
    const dataToUpdate = this.returnDataValid();

    await repository.update(this.id, dataToUpdate);
  }

  async delete() {
    await repository.findById(this.id);

    return await repository.delete(this.id);
  }

  returnDataValid() {
    const fields = ['company', 'email', 'category'];
    const dataToUpdate = { };
    const fieldsEmpties = [];
    fields.forEach(field => {
      const value = this[field];
      if (typeof value === 'string' && value.length) {
        dataToUpdate[field] = value;
      } else {
        fieldsEmpties.push(field);
      }
    });

    if (Object.keys(dataToUpdate).length !== fields.length) {
      throw new FieldInvalid(fieldsEmpties);
    }

    return dataToUpdate;
  }
}

module.exports = Supplier;