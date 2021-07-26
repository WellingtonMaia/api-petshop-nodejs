const Supplier = require('../../../../src/models/supplier/supplier')

jest.mock('../../../../src/repositories/supplier-repository.js')

describe('Class Supplier', () => {
  const object = {
    company: 'Company01',
    email: 'compony01@example.com',
    category: 'brinquedos'
  }

  test('the method returnValid() has return a object', () => {
    const supplier = new Supplier(object)
    expect(supplier.returnDataValid()).toMatchObject(object)
  })

  test('the method create(), was created with success', async () => {
    const supplier = new Supplier(object)
    await supplier.create()
    expect(supplier.id).toBe(500)
    expect(supplier.createdAt).toBe('15/05/2025')
    expect(supplier.updatedAt).toBe('15/05/2025')
    expect(supplier.version).toBe(1)
  })

  test('the method findById(), return object found', async () => {
    const supplier = new Supplier({ id: 500 })
    await supplier.findById()
    expect(supplier.id).toBe(500)
    expect(supplier.createdAt).toBe('15/05/2025')
    expect(supplier.updatedAt).toBe('15/05/2025')
    expect(supplier.version).toBe(1)
  })

  test('the method update(), return id', async () => {
    const id = 500
    const supplier = new Supplier({ ...object, id })
    await supplier.update()
    expect(supplier.id).toBe(id)
  })
})
