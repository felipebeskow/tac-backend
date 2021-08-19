const { RateProduct } = require('../Models/RateProduct');
const mongoose = require('mongoose');
const errors = require('restify-errors');

module.exports = async function getProductRates(req, res, next) {
  let productId = req.params.userId;
  await RateProduct.findAll({
    idProduct: productId
  }, (err, rate)=>{
    if (err) return res.send(new errors.NotFoundError());
    return rate;
  });
  return res.send(rate);

}