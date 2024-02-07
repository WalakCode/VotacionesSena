const express = require('express')
const router = express.Router()
const  {postLogin,getMain,getVotos,getEstadisticas} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/login',postLogin)
    .post('/api/votos',validarToken,getVotos)
    .get('api/estadisticas',validarToken,getEstadisticas)
    .get('/',getMain)



module.exports = router 