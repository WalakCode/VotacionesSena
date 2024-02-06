const express = require('express')
const router = express.Router()
const  {postLogin,getMain,getVotos} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/login',postLogin)
    .post('/api/votos',validarToken,getVotos)
    .get('/',getMain)


module.exports = router 