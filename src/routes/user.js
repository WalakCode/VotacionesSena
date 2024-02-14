const express = require('express')
const router = express.Router()
const  {postLogin,getCandidatos,getVotos,getEstadisticas} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/user/login',postLogin)
    .get('/api/user/candidatos',getCandidatos)
    .post('/api/user/votos',validarToken,getVotos)
    .get('/api/admin/estadisticas',validarToken,getEstadisticas)

 


module.exports = router 