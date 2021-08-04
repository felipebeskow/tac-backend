var express = require('express');
var router = express.Router();

const { User } = require('../database/models');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req,res,next)=>{
  let user = await User.findOne( { where: { login: req.body.login } } );
  if ( (user !== null) && (user.password == req.body.password) ) {
    let token = jwt.sign(
      {
        id: user.id,
        type: user.type
      },
      process.env.SECRET,
      {
        expiresIn: 300 //5 minutos
      }
    );
    res.status(200).json({
      auth: true,
      token
    });
  } else {
    res.status(500).json({
      auth: false,
      token: null
    });
  }
});

router.get('/logout', (req,res,next)=>{
  res.status(200).json({
    auth: false,
    token: null
  });
});

module.exports = router;
