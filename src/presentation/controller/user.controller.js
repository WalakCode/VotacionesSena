const userService = require("../../business/services/user.services");

const getMain = async (req, res) => {
  delete req.session.userID;
  delete req.session.jornadaID;
  delete req.session.cedula;

  res.header("Cache-Control", "no-store, no-cache, must-revalidate");
  res.header("Pragma", "no-cache");

  res.render("main");
};

const postLogin = async (req, res) => {

  const status = await userService.loginUser(req.body);

  if (status.error) {
    res.json(status);
    // errores de estado al iniciar sesion con status.error = 'el error que sucedio' 
  }

  //en caso de no error se guarda en sessiones estos datos 
  req.session.userID = status.userID;
  req.session.jornadaID = status.jornadaID;
  req.session.cedula = status.cedula;

  res.redirect("/candidatos");
};

const getCandidatos = async (req, res) => {

  res.header("Cache-Control", "no-store, no-cache, must-revalidate");
  res.header("Pragma", "no-cache");

  const cedula = parseInt(req.session.cedula)



  if (req.session.userID) {
    switch (req.session.jornadaID) {
      case 0:
        res.render("candidatos mañana",{cedula:cedula});
        break;
      case 1:
        res.render("candidatos tarde",{cedula:cedula});
        break;
      case 2:
        res.render("candidatos noche",{cedula:cedula});
        break;
      case 3:
        res.render("candidatos virtual",{cedula:cedula});
        break;
    }
  } else {
    res.send("error session no activa");
  }
};

module.exports = {
  getMain,
  postLogin,
};
