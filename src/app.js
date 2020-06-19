require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const bodyParser = express.json();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

//I would usually use a router for endpoints, but given theres only one im going to choose to not this time around
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/', bodyParser, (req, res) =>{
    res.send('Hello, post!');
});

app.put('/', bodyParser, (req, res) =>{
    res.send('Hello, put!');
});

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app