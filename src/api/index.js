const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NotFound = require('../errors/not-found');
const FieldInvalid = require('../errors/field-invalid');
const TypeValueInvalid = require('../errors/type-value-invalid');
const formatAccepted = require('./serializer').formatAccepted;
const ErrorSerializer = require('./serializer').ErrorSerializer;
const FieldsNotFilled = require('../errors/fields-not-filled');

app.use(bodyParser.json());

//middleware
app.use((req, res, next) => {
  res.set('X-Powered-By', 'Petshop Gatito');
  
  //CORS
  res.set('Access-Control-Allow-Origin', '*')
  
  next();
});

//middleware
app.use((request, response, next) => {
  let requestFormat = request.header('Accept');
  
  if (requestFormat === '*/*') {
    requestFormat = 'application/json'
  }

  if (formatAccepted.indexOf(requestFormat) === -1) {
    response.status(406);
    response.end();
    return;
  }

  response.setHeader('Content-Type', requestFormat)
  next();
});

//routes
const supplierRouter = require('./../routes/supplier/index');
app.use('/api/suppliers', supplierRouter);

const supplierRouterV2 = require('./../routes/supplier/supplier.v2');
app.use('/api/v2/suppliers', supplierRouterV2);

//middleware
app.use((error, request, response, next) => {
  let statusCode = 500;
  
  if (error instanceof NotFound) {
    statusCode = 404;
  }

  if (error instanceof FieldInvalid || error instanceof FieldsNotFilled) {
    statusCode = 400;
  }

  if (error instanceof TypeValueInvalid) {
    statusCode = 406;
  }

  const serialize = new ErrorSerializer(
    response.getHeader('Content-Type')
  )

  response.status(statusCode).send(
    serialize.serializer({
      message: error.message,
      id: error.idError,
    })
  );
});

app.listen(config.get('api.port'), () => console.log('run API Petshop...'));