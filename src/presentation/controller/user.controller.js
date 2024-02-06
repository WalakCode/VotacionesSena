const userService = require("../../business/services/user.services");
const jwt = require('jsonwebtoken');

const getMain = async (req, res) => {
res.send('hola mundo')
};

const postLogin = async (req, res) => {

  const status = await userService.loginUser(req.body);

  if (status.error) {
    res.json({
      error: status.error,
    });
  } else {

    const userInf = {
      userID: status.userID,
      jornadID: status.jornadaID,
      cedula: status.cedula,
    };

    const options ={expiresIn: '15m'};

    const token = jwt.sign(userInf,process.env.SK,options)
  
    res.json({
      message:'autentificacion bien',
      token:token
    })
  }
};

const getVotos = async(req,res)=>{

  // console.log(req.result)
  // console.log(req.body)

  const candidatoID = req.body.candidatoID
  const userID = parseInt(req.result.userID)
  
  const jornadaID = req.result.jornadaID 

  const voto = await userService.verifyVoto(userID)
    if(!voto){
      const status = await userService.insertVoto([candidatoID,userID])
      if(status){
        res.json(status)
      }else{
        res.json({message:'error al insertar'})
      }
    }else{
      res.json(voto)
    }
}

module.exports = {
  postLogin,
  getVotos,
  getMain,
};
