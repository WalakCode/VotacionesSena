const express = require('express')
const router = express.Router()
const {postLogin,postVotos} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/login',postLogin) //ruta para iniciar sesion como aprendiz o administrador
    .post('/api/votos',validarToken,postVotos) //ruta para que el aprendiz vote
 

 
 

module.exports = router 