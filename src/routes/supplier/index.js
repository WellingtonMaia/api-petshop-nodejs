const router = require('express').Router()
const repository = require('./../../repositories/supplier-repository')
const Supplier = require('./../../models/supplier/supplier')
const SupplierSerializer = require('../../api/serializer').SupplierSerializer

router.options('/', (req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204)
  res.end()
})

router.options('/:id', (req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204)
  res.end()
})

router.get('/', async (req, res) => {
  const result = await repository.list()

  const serialize = new SupplierSerializer(
    res.getHeader('Content-Type'),
    ['company', 'category']
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
      res.getHeader('Content-Type'),
      ['company', 'category']
    )

    res.status(201).send(
      serialize.serializer(supplier)
    )
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const supplier = new Supplier(req.params)
    await supplier.findById()

    const serialize = new SupplierSerializer(
      res.getHeader('Content-Type'),
      ['email', 'createdAt', 'updatedAt', 'version', 'company', 'category']
    )

    res.status(200).send(
      serialize.serializer(supplier)
    )
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params
    const body = req.body
    const data = Object.assign({}, body, id)

    const supplier = new Supplier(data)
    await supplier.update()

    res.status(201).end()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params

    const supplier = new Supplier(id)
    await supplier.delete()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

const productsRouter = require('./../product/index')
// middleware to check if supplier exist
const checkSupplier = async (req, res, next) => {
  try {
    const id = req.params.supplierId
    const supplier = new Supplier({ id: id })
    await supplier.findById()
    req.supplier = supplier
    next()
  } catch (error) {
    next(error)
  }
}

router.use('/:supplierId/products', checkSupplier, productsRouter)

module.exports = router
