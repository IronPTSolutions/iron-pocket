require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

require('./config/db.config');
const cors = require('./config/cors.config');

const app = express();

/** React app */
app.use(express.static(`${__dirname}/react-app`));

/** Middlewares */
app.use(express.json());
app.use(logger('dev'));
app.use(cors);

/** Routes */
const routes = require('./config/routes.config');
app.use('/api', routes);

/** Configure react routes */
// Todo lo que no sea /api => ruta del react
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/react-app/index.html`)
})

/** Error Handling */

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
    error = createError(404, 'Resource not found');
  } else if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors)
      .reduce((errors, key) => {
        errors[key] = error.errors[key].message;
        return errors;
      }, {});
  }
  res.status(error.status).json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Application running at port ${port}`));
