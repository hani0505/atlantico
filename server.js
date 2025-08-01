require('dotenv').config();
const bodyParser = require('body-parser'); 
const express = require('express')
const app = express()
app.use(bodyParser.json());
const PORT = 3333
const route  = require('./src/routes/rotas.route')


app.use(route)
app.listen(PORT, () => {
    console.log(`rodando em http://localhost:${PORT}`)
})