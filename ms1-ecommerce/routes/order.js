const verifyJWT = require('../utils/verifyJWT');
//const getOrderProdutc = require('../utils/getOrderProduct');
const postOrderProduct = require('../utils/postOrderProduct');
const { Order, OrderProduct, Product } = require('../database/models');
const router = require('express').Router();

router.get('/', verifyJWT, async (req, res, next)=>{
    let orders;
    try {
        orders = await Order.findAll();
        
        let ordersComplete = [];

        for( let order of orders){
            //if ( req.userType == 'Admin' || req.idUser == order.idUser ) return getOrderProdutc(order);
            let products = [];
        
            let orderProducts = await OrderProduct.findAll({
                where: {
                    idOrder: order.id
                }
            });
    
            for (let orderProduct of orderProducts){
                let product = await Product.findByPk(orderProduct.idProduct);
                products.push({
                    product
                });
            }
            
            if ( req.userType == 'Admin' || req.idUser == order.idUser ) 
                ordersComplete.push({
                    order,
                    orderProducts,
                    products
                });
        };

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
        
        let products = [];
        
        let orderProducts = await OrderProduct.findAll({
            where: {
                idOrder: order.id
            }
        });

        for (let orderProduct of orderProducts){
            let product = await Product.findByPk(orderProduct.idProduct);
            products.push({
                orderProduct,
                product
            });
        }
        
        if ( req.userType == 'Admin' || req.idUser == order.idUser ) 
            return res.json({
                token: req.token,
                order,
                orderProducts,
                products
            });

    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});
/*
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
});*/

router.post('/', verifyJWT, async(req, res, next)=>{
    try {
        let { idUser, dataFaturamento, pais, estado, cidade, cep, logradouro, numero, statusId, status, obs, products } = req.body;
        let { token, userId, userType } = req;


        if(userType != 'Admin' && idUser!=userId) return res.status(401).json({
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
        
        let orderProduct = await postOrderProduct({ idUser, idOrder:order.id, }, products);


        if (orderProduct) return res.status(200).json({
            token,
            order,
            orderProduct
        });


    } catch(error){
        return res.status(400).json({
            token: req.token,
            error
        });
    }
});

//atualiza apenas o status do pedido, já que o pedido foi fechado mesmo
router.put('/:id', verifyJWT, async (req, res, next)=>{
    
    let { dataFaturamento, statusId, status, obs } = req.body;
    let { token, userId, userType } = req;

    try {


        let order = await Order.findByPk(req.params.id);
        
        if(userType != 'Admin' && order.idUser!=userId) return res.status(401).json({
            token,
            error: 'Usuário não autorizado'
        });

        if (!order) return res.status(404);

        let aux = order;
        if (dataFaturamento) aux.dataFaturamento = dataFaturamento;
        if (statusId) aux.statusId = statusId;
        if (status) aux.status = status;
        if (obs) aux.obs = obs;

        await order.update({
            dataFaturamento,
            statusId,
            status,
            obs
        });


        return res.json(order);
        
    } catch(error){
        return res.status(500).json({
            token: req.token,
            error: error
        });
    }
});

router.delete('/:id', verifyJWT, async (req, res, next)=>{
    
    let { token, userId, userType } = req;
    try {
        
        let order = await Order.findByPk(req.params.id);

        if(userType != 'Admin' && order.idUser!=userId) return res.status(401).json({
            token,
            error: 'Usuário não autorizado'
        });

        if (order){
            let orderProducts = await OrderProduct.findAll({
                where: {
                    idOrder:order.id
                }
            });

            if (orderProducts) for (let orderproduct of orderProducts){
                orderproduct.destroy();
            };
    
            order.destroy();
        }
        res.status(200).json({ token });

    } catch(error){
        return res.status(400).json({
            token,
            error
        });
    }
});

module.exports = router;