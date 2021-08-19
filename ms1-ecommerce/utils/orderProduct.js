const { Product, OrderProduct } = require("../database/models");

module.exports = getOrderProdutc =  async (order) => {
    let orderProducts = await OrderProduct.findAll({
        where: {
            idOrder: order.id
        }
    });
    
    /*let products = orderProducts.map( async orderProduct=>{
        let products = await Product.findByPk(orderProduct.idProduct);
        return {
            orderProduct,
            products
        }
    });*/

    let products = [];

    for (let orderProduct of orderProducts){
        let products = await Product.findByPk(orderProduct.idProduct);
        products.append({
            orderProduct,
            products
        });
    }

    return {
        order,
        products
    };
};

module.exports = postOrderProdut = async (order, products) => {
    let orderProducts = [];
    try{
        for(let product of products) {

            let { idProduct, quantidade, valorUnitario, desconto } = product;
            let { idUser, idOrder} = order;

            let orderProduct = await OrderProduct.create({
                idUser, 
                idOrder,
                idProduct,
                quantidade,
                valorUnitario,
                desconto
            });

            orderProducts.push(orderProduct);
            
        };
    } catch (error) {
        console.log(error);
        return {error}
    }
    return orderProducts;
}