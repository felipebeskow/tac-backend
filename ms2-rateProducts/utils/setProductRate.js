const { RateProduct } = require('../Models/RateProduct');
const mongoose = require('mongoose');
const errors = require('restify-errors');

module.exports = async function setProdudtRate(req, res, next){
    let { idProduct, rate, comment } = req.body;
    //console.log('1');
    //json.idUser = req.userId;
    try{
        var count = await RateProduct.findAll({
            'idUser': req.userId,  
            'idProduct': idProduct
        }).count();
        console.log(count);
    } catch (error) {
        return res.send(new errors.NotFoundError(error));
    }
/*
    query.count(async function (error, count) {
        if (error) res.send( new errors.BadRequestError(error) )
        else if (count == 0 ){
            const rateProduct = new RateProduct({
                idProduct, 
                idUser: req.userId,
                rate, 
                comment
            });
            const hasErrors = rateProduct.validateSync();
    
            return hasErrors
            ? res.send( new errors.BadRequestError(hasErrors) )
            : res.send( await rateProduct.save() );
        } else {
            const rateProduct = await RateProduct.update(
                {
                    idUser: req.userId,  
                    idProduct
                },{
                    idProduct, 
                    idUser: req.userId,
                    rate, 
                    comment
                }, null,
                (err, numAffet) => {
    
                    if (err) return res.send( new errors.BadRequestError(err) );
                }
            );
            
            const hasErrors = rateProduct.validateSync();
            return hasErrors
            ? res.send( new errors.BadRequestError(hasErrors) )
            : res.send( await rateProduct.save() );
        }
    });
    */

}