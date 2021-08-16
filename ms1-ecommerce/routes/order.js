const verifyJWT = require('../utils/verifyJWT');
const {getOrderProdutc, postOrderProduct } = require('../utils/orderProduct');
const { Order, OrderProduct } = require('../database/models');
const router = require('express').Router();

router.get('/', verifyJWT, async (req, res, next)=>{
    try {
        let orders = await Order.findAll();

        let ordersComplete = orders.map(order=>{
            if ( req.userType == 'Admin' || req.idUser == order.idUser ) return getOrderProdutc(order);
        });

        return res.json({
            token: req.token,
            ordersComplete
        });
    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

router.get('/:id', verifyJWT, async (req, res, next)=>{
    try{
        let order = await Order.findByPk(req.params.id);
        let orderProduct = getOrderProdutc(order);
        if ( req.userType == 'Admin' || req.idUser == order.idUser ) 
            return res.json({
                token: req.token,
                orderProduct
            });

    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

router.post('/', verifyJWT, async(req, res, next)=>{
    try {
        let { idUser, dataFaturamento, pais, estado, cidade, cep, logradouro, numero, statusId, status, obs, products } = req.body;
        let { token, userId, userType } = req;

        if(userType != 'Admin' || idUser!=userId) return res.status(401).json({
            token,
            error: 'Usuário não autorizado'
        });
        let order = await Order.create({
            idUser,
            dataFaturamento,
            pais, 
            estado,
            cidade,
            cep,
            logradouro,
            numero,
            statusId,
            status, 
            obs
        });
        
        let orderProduct = postOrderProduct(order);

        if (orderProduct) return res.status(200).json({
            token,
            orderProduct
        });


    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

router.put('/:id', verifyJWT, (req, res, next)=>{
    try {
        let { idUser, dataFaturamento, pais, estado, cidade, cep, logradouro, numero, statusId, status, obs, products } = req.body;
        let { token, userId, userType } = req;

        if(userType != 'Admin' || idUser!=userId) return res.status(401).json({
            token,
            error: 'Usuário não autorizado'
        });

        let order = Order.findByPk(rep.params.id);

        if (!order) return res.status(404);

        let orderProducts = OrderProduct.findAll({
            where:{
                idOrder: order.id
            }
        });

        orderProducts.map(orderproduct=>{
            orderproduct.destroy();
        });

        order.update({
            idUser,
            dataFaturamento,
            pais, 
            estado,
            cidade,
            cep,
            logradouro,
            numero,
            statusId,
            status, 
            obs
        });

        orderProducts = postOrderProduct(order);

        if (orderProduct) return res.status(200).json({
            token,
            orderProducts
        });

        
    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

router.delete('/:id', verifyJWT, (req, res, next)=>{
    try {
        let { token, userId, userType } = req;
        
        let order = Order.findByPk(req.params.id);

        if(userType != 'Admin' || order.idUser!=userId) return res.status(401).json({
            token,
            error: 'Usuário não autorizado'
        });

        let orderProducts = OrderProduct.findAll({
            where: {
                idOrder:order.id
            }
        });

        orderProducts.map(orderproduct=>{
            orderproduct.destroy();
        });

        order.destroy();
        res.status(200).json({ token });

    } catch(error){
        return res.status(400).json({
            token,
            error
        });
    }
});

module.exports = router;