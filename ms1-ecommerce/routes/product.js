const router = require('express').Router();

const { Product } = require('../database/models');
const verifyJWT = require('../utils/verifyJWT');

router.get('/', async (req, res, next)=>{
    let products = await Product.findAll();

    if (products) {
        return res.status(200).json(products);
    } else {        
        return res.status(400).json({
            token: req.token,
            error: 'Produtos não encontrados'
        });
    }
});

router.get('/:id', async (req, res, next)=>{
    const product = await Product.findByPk(req.params.id);

    return product ? res.json(product) : res.status(404).json({
        token: req.token,
        error: 'Produto não encontrado'
    });; 
});

router.post('/', verifyJWT, async (req, res)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});

    let { descricao, fabricante, codBarra, lote, valor } = req.body;

    try {
        const product = await Product.create({ descricao, fabricante, codBarra, lote, valor });
        return res.json({
            token: req.token,
            product
        });
    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

router.put('/:id', verifyJWT, async (req, res)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});

    let { descricao, fabricante, codBarra, lote, valor } = req.body;

    try {
        let product = await Product.findByPk(req.params.id);
        if(!product) return res.status(404);

        await product.update({ descricao, fabricante, codBarra, lote, valor });
        return res.json({
            token: req.token,
            product
        });
    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }   
});

router.delete('/:id', verifyJWT, async(req, res, next)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});
    try{
        let product = await Product.findByPk(req.params.id);
        if(!product) return res.status(404);

        await product.destroy();
        return res.json({ token: req.token });
    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

module.exports = router;