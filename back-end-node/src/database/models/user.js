const { Model, DataTypes } = require('sequelize');
const sequelize = new require('../db');

class User extends Model { }

User.init({id: {
    type: DataTypes.INTEGER,
    primaryKey: true
},
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    useremail: DataTypes.STRING,
    password: DataTypes.STRING,
    typedocument: DataTypes.STRING,
    document: DataTypes.BIGINT,
    idcity: DataTypes.BIGINT,
    birthday: DataTypes.DATE,
    deletedAt:DataTypes.DATE,
  
},
{
     sequelize, modelName: 'user' 
});
User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

module.exports = User;

