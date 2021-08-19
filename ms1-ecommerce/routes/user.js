const router = require('express').Router();
const { User } = require('../database/models');
const verifyJWT = require('../utils/verifyJWT');

router.get('/', verifyJWT, async (req, res)=>{
    //somente admin pode acessar a listagem de todos os usuários
    if(req.userType == 'Admin') {
        let users =  await User.findAll();
        return res.json( {
            token: req.token,
            users
        } );
    }
    return res.status(401).send({
        token: req.token,
        error: "Usuário não autorizado"
    });
});

router.get('/:id', verifyJWT, async (req, res)=>{
    //se o usuário que não é admin tenta acessar um id que não é o dele é bloqueado
    if(req.userId != req.params.id && req.userType != 'Admin') return res.status(401).send({ 
        token: req.token, 
        message: `usuário ${req.params.id} não autorizado`
    });

    let user = await User.findByPk(req.params.id);

    if (user) {
        return res.json({
            token: req.token,
            user
        });
    } else
        return res.status(404).json({
            token: req.token,
            error: "Usuário não encontrado"
        }); 
});

//para criar o usuário não vai ser necessário estar logado, já que o usuário ainda não tem login
router.post('/', async (req, res)=>{
    let {name, login, email, password, createdBy, type } = req.body;

    try {

        //Um admin posteriormente poderá promover esse usuário à Admin
        type = 'Padrão';

        const user = await User.create({
            name,
            login,
            email,
            password,
            createdBy,
            type
        });
        return res.json({
            token: req.token,
            user
        });
    } catch(error) {
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

router.put('/:id', verifyJWT, async (req, res)=>{
    let {name, login, email, password, createdBy, type } = req.body;
    //somente um admin pode promover outro usuário à admin
    if (req.userId != req.params.id && req.userType != 'Admin') return res.status(401).send({
        token: req.token,
        message: `usuário ${req.params.id} não autorizado`
    });

    try {
        let user = await User.findByPk(req.params.id);
        if(!user) return res.status(404);

        await user.update({ name, login, email, password, type });
        return res.json({
            token: req.token,
            user
        });
    } catch(error) {
        return res.status(400).json({
            token: req.token,
            error
        });
    }   
});

router.delete('/:id', verifyJWT, async(req, res, next)=>{
    //somente um admin pode apagar um usuário
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});
    try{
        let user = await User.findByPk(req.params.id);
        if(!user) return res.status(404);

        await user.destroy();
        return res.json({ token: req.token });
    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

module.exports = router;