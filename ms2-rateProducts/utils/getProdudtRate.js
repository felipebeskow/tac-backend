const { RateProduct } = require('../Models/RateProduct');
const mongoose = require('mongoose');
const errors = require('restify-errors');

module.exports = async function getProdudtRate(req, res, next) {
    null;
/*
  if ((await User.countDocuments({ login: json.login })) == 0) {
    // Verifica se tem um usuário salvo com o mesmo login
    json.createdAt = new Date(); // Seta a data de criação
    json.lastUpdate = new Date(); // Seta a data de atualização

    const user = new User(json); // Cria um novo objeto da classe User com base no JSON enviado pelo cliente

    const hasErrors = user.validateSync(); // Faz a validação do objeto conforme as restrições definidas no Schema User.
    return hasErrors
      ? res.status(400).json(hasErrors) // Envia a mensagem de erro para o cliente.
      : res.json(await user.save()); // Salva no banco de dados e envia o user para o cliente.
  } // Caso exista um usuário com o mesmo login especificado pelo cliente.
  else res.status(400).json({ category: 'user.login', message: 'Existing login' }); // Envia uma mensagem de erro (400) ao cliente.
  */
}