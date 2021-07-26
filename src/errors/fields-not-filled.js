class FieldsNotFilled extends Error {
  constructor () {
    super('Fields not filled to update')
    this.name = 'FieldsNotFilled'
    this.idError = 4
  }
}

module.exports = FieldsNotFilled
