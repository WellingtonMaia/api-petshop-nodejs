const defaultOptions = (tableName) => {
  return {
    freezeTableName: true,
    tableName: tableName,
    timestamps: true,
    version: 'version'
  }
}

module.exports = defaultOptions