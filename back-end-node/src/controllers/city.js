"use strict";
const City = require('../database/models/city');


var controller = {
  getCities: function (req, res) {

    City.findAll().then(cities=>{
        return res.status(200).send({ cities: cities});
    }).catch(err=>{
        return res.status(200).send({ message: "No hay ciudades" });
    });

  }
}


module.exports = controller;
 