const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.send("<h1>Servidor executando com ExpressJS</h1>");
});

module.exports = router;