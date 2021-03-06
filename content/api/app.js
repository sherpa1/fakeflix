const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);

app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500 ?? err.status);
});

module.exports = app;
