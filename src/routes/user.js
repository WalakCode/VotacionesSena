const express = require('express')
const router = express.Router()
const  {postLogin,getVotos,getMain} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/user/login',postLogin)
    .post('/api/user/votos',validarToken,getVotos)
    .get('/',getMain)
    .post('/hola',postMain)

 


module.exports = router 