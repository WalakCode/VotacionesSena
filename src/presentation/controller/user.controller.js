const userService = require("../../business/services/user.services");
const statsService = require("../../business/services/stats.services");

const jwt = require("jsonwebtoken");


const postLogin = async (req, res) => {

  const status = await userService.loginUser(req.body);
  if (status.status == 202) {
    if (status.rol == "admin") {
      const options = { expiresIn: "500m" };
      const userInf = {
        rol: "admin",
      };
      const token = jwt.sign(userInf, process.env.SK, options);

      const stats = await statsService.getEstadisticas()

      res.status(status.status).json({
        token: token,
        message: status.message,
        stats:stats
      });

    } else if (status.rol == "user") {
      const userInf = {
        rol: "user",
        userID: status.userID,
        jornadaID: status.jornadaID,
        cedula: status.cedula,
      };

      const options = { expiresIn: "15m" };
      const token = jwt.sign(userInf, process.env.SK, options);

      const info = await userService.getCandidatoInfo(status.jornadaID)

      res.status(status.status).json({
        token: token,
        message: status.message,
        info:info
      });
    }
  } else {
    res.status(status.status).json(status.message);
  }
};

const getVotos = async (req, res) => {
  if (req.result.rol == "user") {
    const candidatoID = req.body.candidatoID;

    const userID = parseInt(req.result.userID);

    const jornadaID = req.result.jornadaID;

    const voto = await userService.verifyVoto({
      userID,
      candidatoID,
      jornadaID,
    });
    if (voto.status == 200) {
      const status = await userService.insertVoto([candidatoID, userID]);
      if (status.status == 201) {
        res.status(status.status).json(status.message);
      } else {
        res.status(status.status).json(status.message);
      }
    } else {
      res.status(voto.status).json(voto.message);
    }
  }else{
    res.status(401).json({ mensaje: "denegado" });
  }
};

module.exports = {
  postLogin,
  getVotos,

};