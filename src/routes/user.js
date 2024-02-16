const express = require('express')
const router = express.Router()
const  {postLogin,getVotos} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/user/login',postLogin)
    .post('/api/user/votos',validarToken,getVotos)
   

 


module.exports = router 