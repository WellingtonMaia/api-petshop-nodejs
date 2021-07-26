module.exports = {
  list () {
    return []
  },

  insert (supplier) {
    return {
      id: 500,
      createdAt: '15/05/2025',
      updatedAt: '15/05/2025',
      version: 1
    }
  },

  async findById (id) {
    return {
      id: 500,
      createdAt: '15/05/2025',
      updatedAt: '15/05/2025',
      version: 1
    }
  },

  async update (id, supplier) {
    return {
      id: id,
      createdAt: '15/05/2025',
      updatedAt: new Date(),
      version: 1
    }
  },

  async delete (id) {
  }
}
