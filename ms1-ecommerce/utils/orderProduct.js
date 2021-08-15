const { Product, OrderProduct } = require("../database/models");

module.exports = getOrderProdutc = (order) => {
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
};

module.exports = postOrderProdut = (order, products) => {
    products.map(product=>{
        let { idProduct, quantidade, valorUnitario, desconto } = product;
        let { idUser, idOrder, valor } = order;
        if (valor != (valorUnitario * quantidade) - desconto) return;
        let orderProduct = await OrderProduct.create({
            idUser, 
            idOrder,
            idProduct,
            quantidade,
            valorUnitario,
            desconto
        });
        if (orderProduct) return getOrderProdutc(order);
        
        return;
    });
}