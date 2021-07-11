class TypeValueInvalid extends Error {
  constructor(contentType) {
    super(`type of content/${contentType} is invalid`)
    this.name = 'TypeValueInvalid';
    this.idError = 3;
  }
}

module.exports = TypeValueInvalid;