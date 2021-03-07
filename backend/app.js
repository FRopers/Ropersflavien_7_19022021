const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
});

app.use(bodyParser.json());

const postsRoutes = require('./routes/post');
const usersRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comment');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', usersRoutes);
app.use('/', postsRoutes);
app.use('/comment', commentsRoutes);

module.exports = app;