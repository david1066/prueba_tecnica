const { Model, DataTypes } = require('sequelize');
const sequelize = new require('../db');

class User extends Model { }

User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    typedocument: DataTypes.STRING,
    document: DataTypes.BIGINT,
    idcity: DataTypes.BIGINT,
    birthday: DataTypes.DATE,
  
},
{
     sequelize, modelName: 'user' 
});

module.exports = User;
