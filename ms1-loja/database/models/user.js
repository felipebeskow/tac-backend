'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //User.hasOne(User, {as: 'login'});
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      validate:{
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notNull: false
      }
    },
    type:       {
      type: DataTypes.STRING,
      defaultValue: 'Normal'
    },
    createdBy:  {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};