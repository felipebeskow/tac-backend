const { RateProduct } = require('../Models/RateProduct');
const mongoose = require('mongoose');
const errors = require('restify-errors');

module.exports = async function getProductRate(req, res, next) {
  let { userId } = req;
  let productId = req.params.userId;
  await RateProduct.findOne({
    idUser: userId,
    idProduct: productId
  }, (err, rate)=>{
    if (err) return res.send(new errors.NotFoundError());

    return rate;
  });
  return res.send(rate);

}