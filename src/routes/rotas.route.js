const Router = require('express')
const controller = require('../controllers/controll')
const middlewarAdm = require('../middleware/onlyAdm')
const middlewar = require('../middleware/ensureAuth')

const router = Router()
// nome, perfil, senha
router.post('/cadastrar', controller.cadastrar)
// post
// senha, usuario
router.post('/login', controller.login )
// get
router.get('/check', middlewar , controller.getCheck)
// get salas
router.get('/salas', middlewar ,controller.salas)
// post reservar
router.post('/reservar' , middlewar ,controller.reservar)
// get reservas
router.get('/reservas' , middlewar ,middlewarAdm ,controller.reservasAdm)
module.exports = router