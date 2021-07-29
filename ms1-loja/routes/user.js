const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.json({
        message: 'Informe o id na url'
    });
});

router.get('/:id', (req, res, next)=>{
    res.json({
        nome: 'Felipe Beskow',
        email: 'felipebeskow@outlook.com',
        login: 'beskow',
        id: req.params['id']
    });
});

router.post('/', (req, res, next)=>{
    console.log(req.body);
    res.json(req.body);
});

router.put('/:id', (req, res, next)=>{
    res.json({
        nome: 'Felipe Beskow',
        email: 'felipebeskow@outlook.com',
        login: 'beskow',
        id: req.params['id']
    });    
});

router.delete('/:id', (req, res, next)=>{
    res.json({
        message: `Usuario ${req.params['id']} deletado`
    });
});

module.exports = router;