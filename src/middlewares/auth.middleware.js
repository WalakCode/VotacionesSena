const userService = require("../business/services/user.services");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const generarToken = async (req, res, next) => {

    const status = await userService.loginUser(req.body);

    if (status.error) {
        res.json({
            'error': status.error
        });
    } else {

        const userInf = {
            'userID': status.userID,
            'jornadID': status.jornadaID,
            'cedula': status.cedula
        };

        const options =
        {
            expiresIn: '15m'
        };

        const token = jwt.sign(userInf, process.env.SK, options);
        req.token = token
        next()
    }
};


const validarToken = async (req, res, next) => {

    const verificartoken = promisify(jwt.verify)

    const accessToken = req.header['authorization']
    if (!accessToken) res.send('acceso denegado')

    try {
        const user = await verificartoken(accessToken, process.env.SK);
        console.log(user)
        next()
    } catch (error) {
        console.log(error)
        res.send('acceso denegado token invalido o expirado')
    }
}


module.exports = {
    generarToken,
    validarToken
};
