const createConnection = require("../../config/db");

const getUserInf = async (cedula) => {
  const db = await createConnection();
  try {
    const status = await db.query(
      `SELECT id_votantes, cedula 
        FROM votantes 
        JOIN fichas ON votantes.ficha = fichas.id_fichas 
        WHERE cedula = ? AND fichas.codigo = ?`,
      cedula
    );
    return status;
  } catch (error) {
    console.log(error);
    return null;
  }finally{
    await db.end()
  }
};

const getVotanteJornada = async (ficha) => {
  const db = await createConnection();
  try {
    const jornada = await db.query(
      `SELECT jornada 
        FROM fichas 
        WHERE codigo = ?`,
      ficha
    );
    return jornada;
  } catch (error) {
    console.log(error);
    return null;
  }finally{
    await db.end()
  }
};

const getCandidatoInfo = async (jornada) => {
  const db = await createConnection();
  try {
    const candidatoInfo = await db.query(`SELECT  c.id_candidatos,vt.cedula,vt.nombre,vt.apellido,vt.ciudad,vt.ficha,c.img_candidato,c.img_tarjeton,c.tarjeton,c.plan_gob1,c.plan_gob2,c.plan_gob3,c.perfil_personal,c.slogan,j.jornada
FROM candidatos c
JOIN votantes vt ON c.id_votantes_candidatos = vt.id_votantes
JOIN fichas f ON vt.ficha = f.id_fichas
JOIN jornadas j ON f.jornada = j.id_jornada
WHERE j.id_jornada = ?;
`,jornada);
    return candidatoInfo
  } catch (error) {
    console.log(error);
    return null;
  }finally{
    await db.end()
  }
};

const getCandidatoJornada = async (userID) => {
  const db = await createConnection();
  try {
    const ficha = await db.query(
      `SELECT fichas.jornada
        FROM candidatos
        JOIN votantes ON candidatos.id_votantes_candidatos = votantes.id_votantes
        JOIN fichas ON votantes.ficha = fichas.id_fichas
        WHERE candidatos.id_candidatos = ?;`,
      userID
    );
    return ficha;
  } catch (error) {
    console.log(error);
    return null;
  }finally{
    await db.end()
  }
};

const getFecha = async (userID) => {
  const db = await createConnection();
  try {
    const voto = await db.query(
      `SELECT fecha 
        FROM votos 
        WHERE id_votante = ?`,
      userID
    );
    return voto;
  } catch (error) {
    console.log(error);
    return null;
  }finally{
    await db.end()
  }
};

const insertVotos = async (voto) => {
  const db = await createConnection();
  try {
    const inserted = await db.query(
      `INSERT INTO votos (id_candidato, fecha, id_votante) 
        VALUES (?,NOW(),?)`,
      voto
    );
    return inserted;
  } catch (error) {
    console.log(error);
    return null;
  }finally{
    await db.end()
  }
};

module.exports = {
  getUserInf,
  getVotanteJornada,
  getCandidatoInfo,
  getFecha,
  insertVotos,
  getCandidatoJornada,
};
