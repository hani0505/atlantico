require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const config = require("../configs/auth");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const AppError = require('../AppError'); // Ajuste o caminho conforme seu projeto

// Função para salvar usuários no arquivo JSON
function salvarUser(users) {
  const caminho = path.join(__dirname, '..', 'data', 'usuarios.json');
  fs.writeFileSync(caminho, JSON.stringify(users, null, 2));
}

// Função para ler usuários do arquivo JSON
function lerUser() {
  const caminho = path.join(__dirname, '..', 'data', 'usuarios.json');
  const dados = fs.readFileSync(caminho, 'utf-8');
  return JSON.parse(dados);
}

// Função para ler salas do arquivo JSON
function lerSalas() {
  const caminho = path.join(__dirname, '..', 'data', 'reserva.json');
  const dados = fs.readFileSync(caminho, 'utf-8');
  return JSON.parse(dados);
}

// Função para salvar salas no arquivo JSON
function salvarSalas(salas) {
  const caminho = path.join(__dirname, '..', 'data', 'reserva.json');
  fs.writeFileSync(caminho, JSON.stringify(salas, null, 2));
}

// Cadastrar usuário
function cadastrar(req, res) {
  const { nome, perfil, senha } = req.body;

  if (!nome || !senha || !perfil) {
  
      res.status(400).send("preencha todos os dados")
  }

  const usuarios = lerUser();

  // Verifica se usuário já existe pelo nome
  const existe = usuarios.some(u => u.nome === nome);
  if (existe) {
  
      res.status(400).send("usuario já cadastrado")
  }

  const usuario = {
    id: uuidv4(),
    nome,
    perfil,
    senha
  };

  usuarios.push(usuario);
  salvarUser(usuarios);

  res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
}

// Login
function login(req, res) {
  const { nome, senha, perfil } = req.body;

  if (!nome || !senha) {
  
      res.status(400).send("preencha nome e senha")
  }

  const usuarios = lerUser();

  const user = usuarios.find(u => u.nome === nome && u.senha === senha);
  console.log('JWT Secret:', config.jwt.secret);

  if (!user) {
  
    res.status(401).send("Credenciais inválidas")
  }

  const token = jwt.sign(
    {
      id: user.id,
      nome: user.nome,
      perfil: user.perfil
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

   return res.json(  token ); 
}

// Pega os dados do usuário logado (depois do middleware que popula req.user)
function getCheck(req, res) {
  const user = req.user;
  res.json(user);
}

// Listar nomes das salas (GET)
function salas(req, res) {
  const salas = lerSalas();
    const nomesSalas = salas.map(salaObj => {
    const chaveSala = Object.keys(salaObj).find(key => key.startsWith('sala'));
    return chaveSala;
  }).filter(Boolean);
  res.json(nomesSalas);

}

// Reservar sala (POST)
function reservar(req, res) {
  const { sala } = req.body; //acessa o valor da chave sala
  const aluno = req.user.nome;

  if (!sala) {

      res.status(400).send("informe a sala reservada")
  }

  const dataNow = new Date();
  const dataFormatada = dataNow.toISOString();

  let salas = lerSalas(); // deve retornar seu array do JSON

  // acessa o indice dala ex: se for zero, vai acessar o primeiro objeto(sala1 e data)
  const indexSala = salas.findIndex(obj => obj.hasOwnProperty(sala)); //vai acessar o objeto que tenha a propriedade de sala
  if (indexSala === -1) {
    return res.status(404).json({ mensagem: "Sala não encontrada" });
  }

  // Adiciona a reserva
  salas[indexSala][sala].push({
    aluno,
    data: dataFormatada
  });

  salas[indexSala].data = dataFormatada;

  salvarSalas(salas); // função para escrever no arquivo JSON

  return res.json({
    mensagem: `Reserva feita com sucesso para ${sala}`,
    usuario: req.user
  });
}


// Listar reservas para admins (GET)
function reservasAdm(req, res) {
  const salas = lerSalas();
  res.json(salas);
}

module.exports = {
  cadastrar,
  login,
  getCheck,
  salas,
  reservar,
  reservasAdm
};
