var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
//var createError = require('http-errors');
const db = require('./config/conexion');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const PORT = process.env.PORT || 3000;
var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static('public/images'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/administrador', require('./routes/administrador'));
app.use('/establecimiento',require('./routes/establecimiento'));
app.use('/superadministrador', require('./routes/superadministrador'));
app.use('/personal', require('./routes/personal'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/visitante', require('./routes/visitante'));
app.use('/reportes', require('./routes/reportes'));

//muestra el pdf en vista reportesPositivos
app.get('/sendMePDF', function(req, res) {
  res.sendFile(__dirname + "/public/images/prueba.pdf");
})


// app.use('/asistencia',require('./routes/asistencia'));
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); 

*/


//app.listen(3000,()=> {
  //console.log("Server started on Port 3000")  
//})

app.listen(PORT, () => {
  console.log(`Server started on port${PORT}`);
});


module.exports = app;
