const AppError = require('../AppError');

function ensureAdmin(req, res, next) {
  const usuario = req.user;

  if (usuario.perfil !== 'adm') {
    
      res.status(401).send("não autorizado")
  }

  return next();
}

module.exports = ensureAdmin;
