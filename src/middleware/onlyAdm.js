const AppError = require('../AppError');

function ensureAdmin(req, res, next) {
  const usuario = req.user;

  if (usuario.perfil !== 'adm') {
    throw new AppError('Não autorizado', 401);
  }

  return next();
}

module.exports = ensureAdmin;
