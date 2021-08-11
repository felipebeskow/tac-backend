const verifyJWT = require('../utils/verifyJWT');
const { Product, Order, OrderProduct } = require('../database/');

const router = require('express').Router();

router.get('/', verifyJWT, async (req, res, next)=>{
    if (req.userType != 'Admin') return res.status(401).send({message: 'usuário não autorizado'});

    try {
        let orders = await Order.findAll();

        let ordersComplete = orders.map(order =>{
            let orderProducts = await OrderProduct.findAll({
                where: {
                    idOrder: order.id
                }
            });
            return {
                order,
                products: orderProducts.map(orderProduct=>{
                    let products = await Product.findByPk(orderProduct.idProduct);
                    return {
                        orderProduct,
                        products
                    }
                })
            };
        });

        return res.status(200).json(ordersComplete);
    } catch (e) {
        return res.status(500).json({ token: req.token });
    }
});

module.exports = router;