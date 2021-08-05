const router = require('express').Router();
const { User } = require('../database/models');
const verifyJWT = require('../utils/verifyJWT');

router.get('/', verifyJWT, async (req, res)=>{
    return res.json( await User.findAll() );
});

router.get('/:id', verifyJWT, async (req, res)=>{

    const user = await User.findByPk(req.params.id);

    return user ? res.json(user) : res.sendStatus(404); 
});

router.post('/', async (req, res)=>{
    let {name, login, email, password, createdBy, type } = req.body;
    let id;    

    try {

        if (createdBy == null) {
            id = 'site';
        }

        if (type == null) {
            type = 'padrão';
        }

        const user = await User.create({
            name,
            login,
            email,
            password,
            createdBy: id,
            type
        });
        return res.json(user);
    } catch(e) {
        return res.status(400).json(e);
    }
});

router.put('/:id', verifyJWT, async (req, res)=>{
    let {name, login, email, password, createdBy, type } = req.body;

    try {
        let user = await User.findByPk(req.params.id);
        if(!user) return res.status(404);

        await user.update({ name, login, email, password, type });
        return res.json(user);
    } catch(e) {
        return res.status(400).json(e);
    }   
});

router.delete('/:id', verifyJWT, async(req, res, next)=>{
    try{
        let user = await User.findByPk(req.params.id);
        if(!user) return res.status(404);

        await user.destroy();
        return res.send();
    } catch(e){
        res.status(400).json(e);
    }
});

module.exports = router;