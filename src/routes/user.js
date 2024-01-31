const express = require('express')
const router = express.Router()
const  {getMain,postLogin} = require('../presentation/controller/user.controller')

router.get('/',getMain)
    .post('/login',postLogin)
    .get('/candidatos')

module.exports = router 