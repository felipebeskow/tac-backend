const verifyJWT = require('./verifyJWT');
const RateProduct = require('../Models/RateProduct');
const errors = require('restify-errors');
const getProductRates = require('../../ms2-bkp/utils/getProductRates');

const handleRate = async (req, res, next) => {
    let { idProduct } = req.params;
    try{
        let productRate = await RateProduct.find({
            idProduct
        }).exec();

        return res.send( productRate );

    } catch(error){
        console.error(error.message);
        return res.send( new errors.InternalError(error.message));
    }
}

const handleOnlyRate = async (req, res, next) => {
    let { idProduct } = req.params;
    try{
        let productRate = await RateProduct.find({
            idProduct
        }).exec();

        let rates = 0;
        let countRates = 0;
        
        for( let pr of productRate ) {
            rates += parseInt(pr.rate);
            countRates++;
        }

        rates = parseInt(rates/countRates);

        return res.send( {
            idProduct,
            rates
        } );

    } catch(error){
        console.error(error.message);
        return res.send( new errors.InternalError(error.message));
    }
}

const getRate = (server) => {
    server.get('/rate/:idProduct', handleRate);
    server.get('/rate/:idProduct/onlyRate', handleOnlyRate);
}

module.exports = getRate;