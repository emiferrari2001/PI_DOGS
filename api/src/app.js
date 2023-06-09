const express = require('express');
const server = express();
const routes = require('./routes/index.js');
const morgan = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('./db.js');


server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(cookieParser());

//MIDDLEWARE
server.use(express.json());
server.use(morgan('dev'));

server.use(cors()); // habilitar CORS

server.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://64701c3ea8e401000884c58b--proyecto-indiv-dogs-emiferrari2001.netlify.app',
    'http://localhost:5100'
  ];
  const origin = req.headers.origin;
  if(allowedOrigins.includes(origin)){
    res.header('Access-Control-Allow-Origin', origin); // update to match the domain you will make the request from
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = error.status || 500;
  const message = error.message || error;
  console.error(error);
  res.status(status).send(message);
});

module.exports = server;
