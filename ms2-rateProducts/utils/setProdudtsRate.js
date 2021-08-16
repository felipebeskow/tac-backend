const { RateProduct } = require('../Models/RateProduct');
const mongoose = require('mongoose');
const errors = require('restify-errors');

module.exports = async function setProdudtsRate(req, res, next){
    let json = { idProduct, RateProduct, comment } = req.body;
    json.idUser = req.userId

    if ( (await RateProduct.countDocuments({ 
        idUser: json.idUser,  
        idProduct: json.idProduct
    })) == 0 ){
        const rateProduct = new RateProduct(json);
        const hasErrors = rateProduct.validateSync();

        return hasErrors
        ? res.send( new errors.BadRequestError(hasErrors) )
        : res.send( await rateProduct.save() );
    } else {
        const rateProduct = await RateProduct.update(
            {
                idUser: req.userId,  
                idProduct: json.idProduct
            },
            json, null,
            (err, numAffet) => {

                if (err) return res.send( new errors.BadRequestError(err) );
            }
        );
        
        const hasErrors = rateProduct.validateSync();
        return hasErrors
        ? res.send( new errors.BadRequestError(hasErrors) )
        : res.send( await rateProduct.save() );

    }
}