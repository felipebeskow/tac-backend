const router = require('express').Router();

const { Product } = require('../database/models');
const verifyJWT = require('../utils/verifyJWT');

router.get('/', async (req, res, next)=>{
    res.json(await Product.findAll());
});

router.get('/:id', async (req, res, next)=>{
    const product = await Product.findByPk(req.params.id);

    return product ? res.json(product) : res.sendStatus(404); 
});

router.post('/', verifyJWT, async (req, res)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});

    let { descricao, fabricante, codBarra, lote, valor } = req.body;

    try {
        const product = await Product.create({ descricao, fabricante, codBarra, lote, valor });
        return res.json(product);
    } catch(e) {
        return res.status(400).json(e);
    }
});

router.put('/:id', verifyJWT, async (req, res)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});

    let { descricao, fabricante, codBarra, lote, valor } = req.body;

    try {
        let product = await Product.findByPk(req.params.id);
        if(!product) return res.status(404);

        await product.update({ descricao, fabricante, codBarra, lote, valor });
        return res.json(product);
    } catch(e) {
        return res.status(400).json(e);
    }   
});

router.delete('/:id', verifyJWT, async(req, res, next)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});
    try{
        let product = await Product.findByPk(req.params.id);
        if(!product) return res.status(404);

        await product.destroy();
        return res.send();
    } catch(e){
        res.status(400).json(e);
    }
});

module.exports = router;