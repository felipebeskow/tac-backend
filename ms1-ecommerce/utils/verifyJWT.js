const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({
        auth:false,
        token: null,
        message: 'Nenhum token enviado'
    });
    jwt.verify(token, process.env.SECRET, (err,decoded)=>{
        if (err) {
            console.log(err);
            return res.status(500).send({
                auth: false,
                token: null,
                message: 'Falha ao autenticar o token',
                err
            });
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