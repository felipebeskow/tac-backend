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
const getProdudtRate = require('./utils/getProdudtRate');
const setProdudtRate = require('./utils/setProdudtRate');

let server = restify.createServer();

//erver.get('/product/:id', verifyJWT, getProdudtRate);
server.post('/rate/:id', verifyJWT, setProdudtRate);

console.log(process.env.PORT);

server.listen(process.env.PORT, ()=>{
    console.log('rodando em %s', server.url);
});