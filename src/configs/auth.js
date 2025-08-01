require('dotenv').config(); // garante que o dotenv seja carregado aqui também, se necessário

module.exports = {
  jwt: {
        secret: process.env.SECRET,
  expiresIn:  '1h'
  }

};
