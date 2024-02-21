const statsRepository = require("../../persistence/repository/stats.repository");

//funcion de obtener estadisticas totales
const getEstadisticas = async () => {
  //se llama al repositorio de las estadisrticas a la funcion de obtener los votos, se le pasa la respectiva jornada
  const statsMañana = await statsRepository.getVotos(1);
  const statsTarde = await statsRepository.getVotos(2);
  const statsNoche = await statsRepository.getVotos(3);
  const statsVirtual = await statsRepository.getVotos(4);
  const statsBlanco = await statsRepository.getVotosBlanco();


  //en caso de que no sea null se ejecuta el algoritmo de separacion de candidatos y cantidad de votos
  if (
    statsMañana &&
    statsTarde &&
    statsNoche &&
    statsVirtual &&
    statsBlanco != null
  ) {
    const votosMañana = statsMañana[0]
    const votosTarde = statsTarde[0]
    const votosNoche = statsNoche[0]
    const votosVirtual = statsVirtual[0]
    const votosBlanco = countVotosBlanco(statsBlanco[0])

    const allStats  = {votosMañana,votosTarde,votosNoche,votosVirtual,votosBlanco}

    return {message:"estadisticas",status:200,info:allStats}
  } 


  function countVotosBlanco(array) {
    const mapa = {};
    array.forEach((e) => {
      mapa[e.jornada] = e.cantidad_votos_blanco;
    });
    return mapa;
  }

};

module.exports = {
  getEstadisticas,
};
