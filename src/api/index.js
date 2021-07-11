const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NotFound = require('../errors/not-found');
const FieldInvalid = require('../errors/field-invalid');
const TypeValueInvalid = require('../errors/type-value-invalid');
const formatAccepted = require('./serializer').formatAccepted;
const ErrorSerializer = require('./serializer').ErrorSerializer;

app.use(bodyParser.json());

//middelware
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

const router = require('./../routes/supplier/index');

app.use('/api/suppliers', router);

//middelware
app.use((error, request, response, next) => {
  let statusCode = 500;
  
  if (error instanceof NotFound) {
    statusCode = 404;
  }

  if (error instanceof FieldInvalid) {
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