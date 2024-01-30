const express = require('express')
const router = express.Router()
const  {getMain,postLogin,getCandidatos} = require('../presentation/controller/user.controller')

router.get('/',getMain)
    .post('/login',postLogin)
    .get('/candidatos',getCandidatos)

module.exports = router