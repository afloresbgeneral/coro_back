'use strict'

var express = require('express');
var dataController = require('../controllers/data');

var api = express.Router();

api.get('/from-test-controller', dataController.test);
api.get('/time_series_confirm', dataController.importCsvFile);

module.exports = api;