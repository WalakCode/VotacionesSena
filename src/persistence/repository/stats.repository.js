const createConnection = require("../../config/db");

//funcion para obtener cedula nombre y cantidad de votos de cada candidato, respecto a una jornada dada
const getVotos = async (jornada) => {
  const db = await createConnection();
  //se crea la conexion
  try {
    //query
    const votos = await db.query(
      `SELECT vt.cedula AS cedula_candidato,j.jornada AS nombre_jornada,COUNT(v.id_votos) AS cantidad_votos
FROM votos v
JOIN candidatos c ON v.id_candidato = c.id_candidatos
JOIN votantes vt ON c.id_votantes_candidatos = vt.id_votantes
JOIN fichas f ON vt.ficha = f.id_fichas
JOIN jornadas j ON f.jornada = j.id_jornada
WHERE j.id_jornada = ? -- Reemplaza ? con el valor deseado
GROUP BY c.id_candidatos, vt.cedula, j.jornada
ORDER BY cantidad_votos DESC;

`,
//se le pasa la jornada a consultar
      jornada
    );
    //en caso de que la consulta sea exitosa se devuelve los resultados
    return votos;
  } catch (error) {
    console.log(error);
    //en caso de que la consulta no sea exitosa se devuelve null para futuras comparaci nes
    return null
  } finally {
    //se cierra la conexion
    await db.end();
  }
};

module.exports = {
  getVotos,
};
