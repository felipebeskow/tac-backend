let restify = require('restify');

require('dotenv-safe').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 60000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => {
    console.log(`Connected to MongoDB: ${process.env.MONGO_URL}`);
  })
  .catch((err) => {
    console.log(`MongoDB Not Connected!`);
    console.log(err);
  });

const verifyJWT = require('./utils/verifyJWT');
const getProductRate = require('./utils/getProductRate');
const getProductRates = require('./utils/getProductRates');
const setProductRate = require('./utils/setProductRate');

let server = restify.createServer();

server.use(restify.plugins.bodyParser());

//server.get('/productRate/:id', verifyJWT, await getProductRate);
//server.get('/productRates/:id', verifyJWT, await getProductRates);
server.post('/rate', verifyJWT, setProductRate);

console.log(process.env.PORT);

server.listen(process.env.PORT, ()=>{
    console.log('rodando em %s', server.url);
});