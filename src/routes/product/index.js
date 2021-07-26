const router = require('express').Router({
  mergeParams: true
})
const repository = require('../../repositories/product-repository')
const Product = require('../../models/product/product')
const ProductSerializer = require('../../api/serializer').ProductSerializer

router.options('/', (req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204)
  res.end()
})

router.options('/:id', (req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204)
  res.end()
})

router.get('/', async ({ supplier }, res) => {
  const serialize = new ProductSerializer(
    res.getHeader('Content-Type')
  )
  const result = await repository.list(supplier.id)

  res.status(200).send(
    serialize.serializer(result)
  )
})

router.post('/', async ({ body, supplier }, res, next) => {
  try {
    const productData = Object.assign({}, body, { supplier: supplier.id })

    const product = new Product(productData)
    await product.create()

    const serialize = new ProductSerializer(
      res.getHeader('Content-Type'),
      ['createdAt', 'updatedAt', 'version']
    )

    res.set('ETag', product.version)
      .set('Last-Modified', (new Date(product.updatedAt)).getTime())
      .set('Location', `/api/suppliers/${product.supplier}/products/${product.id}`)
      .status(200)
      .send(
        serialize.serializer(product)
      )
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async ({ params, supplier }, res, next) => {
  try {
    const product = new Product({
      id: params.id,
      supplier: supplier.id
    })

    await product.findById()

    const serialize = new ProductSerializer(
      res.getHeader('Content-Type'),
      ['createdAt', 'updatedAt', 'version']
    )

    res.set('ETag', product.version)
      .set('Last-Modified', (new Date(product.updatedAt)).getTime())
      .status(200)
      .send(
        serialize.serializer(product)
      )
  } catch (error) {
    next(error)
  }
})

router.head('/:id', async ({ params, supplier }, res, next) => {
  try {
    const product = new Product({
      id: params.id,
      supplier: supplier.id
    })

    await product.findById()

    res.set('ETag', product.version)
      .set('Last-Modified', (new Date(product.updatedAt)).getTime())
      .status(200)
      .end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async ({ body, params, supplier }, res, next) => {
  try {
    const productData = Object.assign(
      {},
      body,
      { supplier: supplier.id, id: params.id }
    )

    const product = new Product(productData)
    await product.update()
    await product.findById()

    res.set('ETag', product.version)
      .set('Last-Modified', (new Date(product.updatedAt)).getTime())
      .status(204)
      .end()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async ({ params, supplier }, res, next) => {
  try {
    const data = {
      id: params.id,
      supplier: supplier.id
    }
    const product = new Product(data)
    await product.delete()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.options('/:id/decrease-stock', (req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204)
  res.end()
})

router.post('/:id/decrease-stock', async ({ body, params, supplier }, res, next) => {
  try {
    const product = new Product({
      id: params.id,
      supplier: supplier.id
    })

    product.setAmount(body.amount)
    await product.decreaseStock()
    await product.findById()

    res.set('ETag', product.version)
      .set('Last-Modified', (new Date(product.updatedAt)).getTime())
      .status(204)
      .end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
