const statsRepository = require("../../persistence/repository/stats.repository");

const getEstadisticas = async () => {
    
  const statsMañana = await statsRepository.getVotos(1);
  const statsTarde = await statsRepository.getVotos(2);
  const statsNoche = await statsRepository.getVotos(3);
  const statsVirtual = await statsRepository.getVotos(4);

  const votosMañana = countVotos(statsMañana[0]);
  const votosTarde = countVotos(statsTarde[0]);
  const votosNoche = countVotos(statsNoche[0]);
  const votosVirtual = countVotos(statsVirtual[0]);

  const allStats = {votosMañana, votosTarde, votosNoche, votosVirtual};

  return allStats



  function countVotos(statsArray) {
    const mapa = {};

    statsArray.forEach((e) => {
        mapa[e.cedula_candidato] = e.cantidad_votos
    });

    return mapa;
  }
};


module.exports = {
  getEstadisticas,
};
