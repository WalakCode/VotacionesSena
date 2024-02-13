const db = require("../../config/db");

const getVotos = async (jornada) => {
  try {
    const votos = await db.query(``,jornada)
    console.log(votos)
    return votos
  } catch (error) {
    console.log(error)
  }
};


module.exports = {
    getVotos
}
