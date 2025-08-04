const jwt = require('jsonwebtoken');
const auth = require('../configs/auth.js');
const AppError = require('../AppError');

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers['authorization']; // cabeçalho é lowercase
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {

    res.status(401).send("token não enviado")
  }

  try {
    const decoded = jwt.verify(token, auth.jwt.secret);
    req.user = decoded; // coloca o usuário decodificado na req
    next(); // segue para o controller
  } catch (err) {
    res.status(403).send("token inválido")
  }
}

module.exports = ensureAuthenticated;
