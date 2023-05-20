// const express = require('express');
// const logger = require('morgan');
// const mongoose = require('mongoose');
// const compression = require('compression');
import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(logger('dev'));

// app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// added unified typlology and use create index
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
// app.use(require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`
  📡 The app is listening on port ${PORT}!
  `);
});