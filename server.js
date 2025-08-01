const express = require('express')
const app = express()
app.use(express.json())
const PORT = 3333
const route  = require('./src/routes/rotas.route')


app.use(route)
app.listen(PORT, () => {
    console.log(`rodando em http://localhost:${PORT}`)
})