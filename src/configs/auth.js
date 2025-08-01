require('dotenv').config(); // garante que o dotenv seja carregado aqui também, se necessário
// para ter uma chave crie um env na raiz e coloque a variavel
module.exports = {
  jwt: {
        secret: process.env.SECRET,
        expiresIn:  '1h'
  }

};
