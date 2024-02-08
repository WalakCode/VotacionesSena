const userService = require("../../business/services/user.services");
const statsService = require("../../business/services/stats.services");

const jwt = require('jsonwebtoken');

const getMain = async (req, res) => {
  res.send('hola mundo')
};

const postLogin = async (req, res) => {

  const status = await userService.loginUser(req.body);
  console.log(status.userID,status.jornadaID)

  if (status.message == 'ok') {

    const options = { expiresIn: '10s' };
    const userInf = {
      rol:'administrador',
    }
    const token = jwt.sign(userInf, process.env.SK, options)
    res.json({
      message:'autenticado',
      token:token
    })

  } else if (status.message) {
    res.json(status);
  } else {

    const userInf = {
      rol: 'votante',
      userID: status.userID,
      jornadaID: status.jornadaID,
      cedula: status.cedula,
    };

    const options = { expiresIn: '15m' };

    const token = jwt.sign(userInf, process.env.SK, options)

    res.json({
      message: 'autenticado',
      token: token
    })
  }
};

const getVotos = async (req, res) => {
  const candidatoID = req.body.candidatoID
  // console.log(candidatoID)
  const userID = parseInt(req.result.userID)

  const jornadaID = req.result.jornadaID


  const voto = await userService.verifyVoto({ userID, candidatoID, jornadaID })
  if (!voto) {
    const status = await userService.insertVoto([candidatoID, userID])
    if (status) {
      res.json(status)
    } else {
      res.json({ message: 'error al insertar' })
    }
  } else {
    res.json(voto)
  }
}

const getEstadisticas = async(req,res) =>{
  
   
}

module.exports = {
  postLogin,
  getVotos,
  getMain,
  getEstadisticas
};
