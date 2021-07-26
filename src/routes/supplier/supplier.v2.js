const router = require('express').Router()
const repository = require('./../../repositories/supplier-repository')
const Supplier = require('./../../models/supplier/supplier')
const SupplierSerializer = require('../../api/serializer').SupplierSerializer

router.options('/', (req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204)
  res.end()
})

router.get('/', async (req, res) => {
  const result = await repository.list()

  const serialize = new SupplierSerializer(
    res.getHeader('Content-Type'),
    ['category']
  )

  res.status(200).send(
    serialize.serializer(result)
  )
})

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const supplier = new Supplier(data)
    await supplier.create()

    const serialize = new SupplierSerializer(
      res.getHeader('Content-Type')
    )

    res.status(201).send(
      serialize.serializer(supplier)
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
