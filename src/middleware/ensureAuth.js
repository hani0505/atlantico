const jwt = require('jsonwebtoken');
const auth = require('../configs/auth.js');
const AppError = require('../AppError'); // ajuste para onde está sua classe

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // forma mais segura

  if (!token) {
    throw new AppError("Token não enviado", 401);
  }

  try {
    const decoded = jwt.verify(token, auth.jwt.secret);
    req.user = decoded; // aqui você insere os dados do usuário para a próxima rota
    next(); // segue o fluxo
  } catch (err) {
    throw new AppError("Token inválido", 403);
  }
}

module.exports = ensureAuthenticated;
