const db = require("../../config/db");

const getVotos = async () => {
  try {
    const votos = await db.query(`SELECT * from votos`)
    console.log(votos)
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
    getVotos,
}
