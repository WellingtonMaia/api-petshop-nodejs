const TypeValueInvalid = require("../errors/type-value-invalid");
const jsontoxml = require('jsontoxml');

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    let tag = this.singularTag;

    if (Array.isArray(data)) {
      tag = this.pluralTag;
      data = data.map((item) => {
        return {
          [this.singularTag]: item
        }
      });
    }

    return jsontoxml({ [tag]: data });
  }

  serializer(data) {
    data = this.filter(data);

    if (this.contentType === 'application/json') {
      return this.json(data);
    }

    if(this.contentType === 'application/xml') {
      return this.xml(data);
    }

    throw new TypeValueInvalid(this.contentType);
  }

  filterObject(data) {
    const newObject = {};

    this.publicFields.forEach(field => {
      if (data.hasOwnProperty(field)) {
        newObject[field] = data[field];
      }
    });

    return newObject;
  }

  filter (data) {
    if (Array.isArray(data)) {
      data = data.map(item => this.filterObject(item))
    } else {
      data = this.filterObject(data);
    }

    return data;
  }
}

class SupplierSerializer  extends Serializer {
  constructor(contentType, extrasFields) {
    super();
    this.contentType = contentType
    this.publicFields = [
      'id',
      'company',
      'category'
    ].concat(extrasFields || []);
    this.singularTag = 'supplier';
    this.pluralTag = 'suppliers'
  }
}

class ErrorSerializer  extends Serializer {
  constructor(contentType, extrasFields) {
    super();
    this.contentType = contentType
    this.publicFields = [
      'id',
      'message',
    ].concat(extrasFields || []);
    this.singularTag = 'error';
    this.pluralTag = 'errors';
  }
}

module.exports = {
  Serializer,
  SupplierSerializer,
  ErrorSerializer,
  formatAccepted: [
    'application/json',
    'application/xml'
  ]
};