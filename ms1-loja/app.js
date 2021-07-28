const http = require("http");
const express = require("express");
const app = express();

app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));
app.use('/product', require('./routes/product.js'));
app.use('/order', require('./routes/order.js'));

http.createServer(app).listen(3000, () => console.log("Servidor executando na porta 3000"));