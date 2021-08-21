'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    descricao: DataTypes.STRING,
    fabricante: DataTypes.STRING,
    modelo:  DataTypes.STRING,
    marca:  DataTypes.STRING,
    codBarra: DataTypes.INTEGER,
    lote: DataTypes.STRING,
    valor: DataTypes.REAL,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};