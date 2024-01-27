const userService = require('../../business/services/user.services')

const getMain = async (req, res) => {
    res.render('main')
}
const postLogin = async (req, res) => {
    const status = await userService.loginUser(req.body)
    if (status.error) {
        res.json(status)
    }
    switch (status) {
        case 0:
            res.render('candidatos mañana')
            break;
        case 1:
            res.render('candidatos tarde')
            break;
        case 2:
            res.render('candidatos noche')
            break;
        case 3:
            res.render('candidatos virtual')
            break;
    }
}



module.exports = {
    getMain,
    postLogin
}