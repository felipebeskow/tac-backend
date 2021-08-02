const router = require('express').Router();

const { Product } = require('../database/models');

router.get('/', async (req, res, next)=>{
    res.json(await Product.findAll());
});

router.get('/:id', async (req, res, next)=>{
    const product = await Product.findByPk(req.params.id);

    return product ? res.json(product) : res.sendStatus(404); 
});

router.post('/', async (req, res)=>{
    let { descricao, fabricante, codBarra, lote, valor } = req.body;

    try {
        const product = await Product.create({ descricao, fabricante, codBarra, lote, valor });
        return res.json(product);
    } catch(e) {
        return res.status(400).json(e);
    }
});

router.put('/:id', async (req, res)=>{
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

router.delete('/:id', async(req, res, next)=>{
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