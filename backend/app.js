const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.use(bodyParser.json());

const postsRoutes = require('./routes/post');
const usersRoutes = require('./routes/user');

app.use('/', postsRoutes);
app.use('/', usersRoutes);

module.exports = app;