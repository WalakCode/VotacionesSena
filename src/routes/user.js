const express = require('express')
const router = express.Router()
const  {postLogin, getCandidatos,getMain} = require('../presentation/controller/user.controller')
const {generarToken,validarToken} = require('../middlewares/auth.middleware')

router.post('/login',generarToken,postLogin)
    .get('/candidatos',getCandidatos)
    .get('/',validarToken,getMain)


module.exports = router 