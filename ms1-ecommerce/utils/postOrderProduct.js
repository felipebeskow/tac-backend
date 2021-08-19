const { Product, OrderProduct } = require("../database/models");

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