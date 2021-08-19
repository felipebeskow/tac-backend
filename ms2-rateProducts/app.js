let restify = require('restify');
const mongoose = require('mongoose');
const setRate = require('./utils/setRate');
const getRate = require('./utils/getRate');
require('dotenv-safe').config();

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
  }
);

let server = restify.createServer();

server.use(restify.plugins.bodyParser());

setRate(server);
getRate(server);

server.listen(process.env.PORT, ()=>{
    console.log('rodando em %s', server.url);
});