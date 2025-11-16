var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var app=express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/html')));

const userRouter = require('./routes/users');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use("/users",userRouter);

app.set('view engine', 'ejs');

// app.use(function(req, res, next) {
//   next(createError(404));
// });
