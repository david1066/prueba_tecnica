const express= require('express');
const router =express.Router();
var CityController = require('../controllers/city');

//rutas

router.get('/getcities',CityController.getCities);

module.exports= router;