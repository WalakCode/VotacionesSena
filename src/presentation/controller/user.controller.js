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

const getCandidatos = async(req,res)=>{
  console.log(req.result)
}

// const getCandidatos = async (req, res) => {
//   const cedula = parseInt(req.session.cedula);

//   // const jornada = req.session.jornadaID
//   // const imagenes = await userService.getCandidatos(jornada)

//   if (req.session.userID) {
//     switch (req.session.jornadaID) {
//       case 1:
//         res.render("candidatos mañana", { cedula: cedula });
//         break;
//       case 2:
//         res.render("candidatos tarde", { cedula: cedula });
//         break;
//       case 3:
//         res.render("candidatos noche", { cedula: cedula });
//         break;
//       case 4:
//         res.render("candidatos virtual", { cedula: cedula });
//         break;
//     }
//   } else {
//     res.send("error session no activa");
//   }
// };

module.exports = {
  postLogin,
  getCandidatos,
  getMain,
};
