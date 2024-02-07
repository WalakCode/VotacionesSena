const db = require("../../config/db");

const getVotos = async () => {
  try {
    const votos = await db.query(`SELECT * from public.votos`)
    console.log(votos)
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
    getVotos,
}
