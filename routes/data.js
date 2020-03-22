'use strict'

var express = require('express');
var dataController = require('../controllers/data');

var api = express.Router();

api.get('/from-test-controller', dataController.test);
api.get('/parse_data', dataController.parse);
api.get('/parse_data2', dataController.importCsvFile);

module.exports = api;