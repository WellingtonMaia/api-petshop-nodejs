const router = require('express').Router();
const repository = require('./../../repositories/supplier-repository');
const Supplier = require('./../../models/supplier');
const SupplierSerializer = require('../../api/serializer').SupplierSerializer;

router.get('/', async (req, res) => {

  const serialize = new SupplierSerializer(
    res.getHeader('Content-Type')
  );
  const result = await repository.list()

  res.status(200).send(
    serialize.serializer(result)
  );
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const supplier = new Supplier(data);
    await supplier.add();
    
    const serialize = new SupplierSerializer(
      res.getHeader('Content-Type')
    );

    res.status(201).send(
      serialize.serializer(supplier)
    ); 
  
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const supplier = new Supplier(req.params);
    await supplier.findById();

    const serialize = new SupplierSerializer(
      res.getHeader('Content-Type'),
      ['email', 'createdAt', 'updatedAt', 'version']
    ); 
    
    res.status(200).send(
      serialize.serializer(supplier)
    );
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;
    const data = Object.assign({}, body, id);

    const supplier = new Supplier(data);
    await supplier.update();

    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params;
  
    const supplier = new Supplier(id);
    await supplier.delete(); 
  
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;