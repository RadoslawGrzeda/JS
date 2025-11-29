// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');

// var indexRouter = require('./routes/index');
// var app = express();

// // Body parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Serve everything under public as static assets
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/', indexRouter);

// // 404 handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // Generic error handler (no template engine)
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500).send(err.message || 'Server error');
// });

// module.exports = app;
// app.js
var express = require('express');
var path = require('path');
var createError = require('http-errors');

var indexRouter = require('./routes/index');

var app = express();

// 🔹 Body parsing – żeby req.body działało dla JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔹 Statyczne pliki (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Trasy z routera
app.use('/', indexRouter);

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'Server error');
});

module.exports = app;
