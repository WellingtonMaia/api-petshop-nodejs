class FieldInvalid extends Error {
  constructor (fields) {
    const message = `Data(${fields}) incomplete, please fill all fields`
    super(message)
    this.name = 'FieldInvalid'
    this.idError = 1
  }
}

module.exports = FieldInvalid
