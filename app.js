const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json()); // for body parser
app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });
module.exports = app;