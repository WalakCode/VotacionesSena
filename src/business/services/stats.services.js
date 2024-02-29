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
    const Mañana = statsMañana[0]
    const Tarde = statsTarde[0]
    const Noche = statsNoche[0]
    const Virtual = statsVirtual[0]
    const Blanco = countVotosBlanco(statsBlanco[0])

    const allStats  = {Mañana,Tarde,Noche,Virtual,Blanco}

    return {message:"Estadisticas",status:200,info:allStats}
  } else{
    return {message:"Error interno del servidor",status:500}
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
