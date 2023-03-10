const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejs = require('ejs');

const indexRouter = require("./routes/index");
const pdfsRouter = require("./routes/pdfs");

var app = express();
const port = 3000;

// view engine setup
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.set('templates', path.join(__dirname, "templates"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Use Router Configuration
app.use("/", indexRouter);
app.use("/pdfautofill", pdfsRouter);
app.use("/download", pdfsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
});

module.exports = app;

app.listen(port, () => {
  console.log(`application listening on port ${port}`);
});