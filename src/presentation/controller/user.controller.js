const userService = require("../../business/services/user.services");


const getMain = async (req,res) =>{
  res.json({
    "name": "Mcbride Blackburn",
    "gender": "male",
    "company": "SLOFAST",
    "email": "mcbrideblackburn@slofast.com",
    "phone": "+1 (868) 544-3393",
    "address": "496 Cedar Street, Jennings, Tennessee, 5349"
  })
}
const postLogin = async (req, res) => {
  const accessToken = req.token 
  res.header('autorizacion',accessToken).json({
    mensaje:'usuario autenticado',
    token:accessToken
  })
};




const getCandidatos = async (req, res) => {

  const cedula = parseInt(req.session.cedula)


  // const jornada = req.session.jornadaID
  // const imagenes = await userService.getCandidatos(jornada)

  if (req.session.userID) {
    switch (req.session.jornadaID) {
      case 1:
        res.render("candidatos mañana", { cedula: cedula });
        break;
      case 2:
        res.render("candidatos tarde", { cedula: cedula });
        break;
      case 3:
        res.render("candidatos noche", { cedula: cedula });
        break;
      case 4:
        res.render("candidatos virtual", { cedula: cedula });
        break;
    }
  } else {
    res.send("error session no activa");
  }
};

module.exports = {
  postLogin,
  getCandidatos,
  getMain
};
