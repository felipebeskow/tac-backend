const jwt = require('jsonwebtoken');
const errors = require('restify-errors');

function verifyJWT(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.contentType = 'json';
        res.send( new errors.UnauthorizedError("invalid token") );
        return;
    }
    jwt.verify(token, process.env.SECRET, (err,decoded)=>{
        if (err) {
            return res.send( new errors.UnauthorizedError(err) );
        }
        req.token = jwt.sign({
            id: decoded.id,
            type: decoded.type
          },process.env.SECRET,{
            expiresIn: 300 //5 minutos
          }
        );
        req.userId = decoded.id;
        req.userType = decoded.type;
        next();
    });
};

module.exports = verifyJWT;