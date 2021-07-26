class NotFound extends Error {
  constructor (entity) {
    super(`${entity} not found!`)
    this.name = 'NotFound'
    this.idError = 0
  }
}

module.exports = NotFound
