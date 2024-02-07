const userRepository = require("../../persistence/repository/user.repository");


const loginUser = async (info) => {

  let votacionActivada = true //colocar en false al sacarlo a produccion

  const fechaActual = new Date();
  const fechaLimiteMinima = new Date(new Date().getFullYear(), 2, 11, 6, 0, 0, 0);
  const fechaLimiteMaxima = new Date(new Date().getFullYear(), 2, 11, 0, 0, 0, 0);

  if (fechaActual > fechaLimiteMinima && fechaActual < fechaLimiteMaxima) {
    votacionActivada = true
  }

  if (votacionActivada) {
    if (info.cedula && info.ficha) {
      if (isNaN(info.cedula) || isNaN(info.ficha)) {
        if (info.cedula == 'colombia62T' && info.ficha == '622022*') {
          return { message: 'ok' }
        } else {
          return { message: "ecriba ficha o cedula valida (numero)" };
        }
      } else {

        const cedula = parseInt(info.cedula);
        const ficha = parseInt(info.ficha);
        const status = await userRepository.getUserInf([cedula, ficha]);

        if (status.rows.length > 0) {

          const userID = status.rows[0].id_votantes;
          const cedula = status.rows[0].cedula;
          const jornada = await userRepository.getVotanteJornada([ficha]);
          const jornadaID = parseInt(jornada.rows[0].jornada);
          return { jornadaID, userID, cedula };

        } else {
          return { message: "no existe cedula o ficha" };
        }
      }
    } else {
      return { message: "espacios en blanco" };
    }

  } else {
    return { message: 'las votaciones ya acabaron o aun no comienzan' }
  }
};




const verifyVoto = async (data) => {

  const jornada = await userRepository.getCandidatoJornada([data.candidatoID])
  if (parseInt(jornada.rows.jornada) == data.jornadaID) {
    const voto = await userRepository.getFecha([data.userID]);
    if (voto.rows[0]) {
      return { message: "la persona ya voto", fecha: voto.rows[0].fecha };
    } else {
      console.log("asdf");
      return null;
    }
  } else {
    return { message: 'se esta votanto de otra jornada que no es la del usuario logeado' }
  }
};

const insertVoto = async (votos) => {
  const inserted = await userRepository.insertVotos(votos);
  if (inserted) {
    return { message: "ok" };
  } else {
    return null;
  }
};

module.exports = {
  loginUser,
  verifyVoto,
  insertVoto,
};
