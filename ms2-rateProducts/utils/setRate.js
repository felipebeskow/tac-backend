const verifyJWT = require('./verifyJWT');
const RateProduct = require('../Models/RateProduct');
const errors = require('restify-errors');

const handleRate = async (req, res, next) => {
    const { idUser, idProduct, rate, comment } = req.body;
    const { userId, userType, token } = req;

    if (idUser != userId && userType != "Admin") return res.send( new errors.NotAuthorizedError("Usuário não autorizado") );

    let filter = { idUser, idProduct };

    try{
        let productRate = await RateProduct.findOne(filter);

        if (productRate) {
            
            product = await RateProduct.findOneAndUpdate(
                filter,
                {
                    idUser,
                    idProduct,
                    rate,
                    comment
                },
                {
                    new: true
                }
            );

            return res.send(productRate);
        }

        productRate = new RateProduct({
            idUser,
            idProduct,
            rate,
            comment
        });

        await productRate.save();
        return res.send(productRate);

    } catch(error) {
        console.error(error.message);
        res.send( new errors.InternalError(error.message) );
    }
}

const setRate = (server) => {
    server.post('/rate', verifyJWT, handleRate);
}


module.exports = setRate;