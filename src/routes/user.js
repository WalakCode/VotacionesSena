const express = require('express')
const router = express.Router()
const  {postLogin,getMain,getCandidatos} = require('../presentation/controller/user.controller')
const {validarToken} = require('../middlewares/auth.middleware')

router.post('/api/login',postLogin)
    .post('/api/votos',validarToken,getCandidatos)
    .get('/',getMain)


module.exports = router 