const statsRepository = require("../../persistence/repository/stats.repository");

//funcion de obtener estadisticas totales 
const getEstadisticas = async () => {
  //se llama al repositorio de las estadisrticas a la funcion de obtener los votos, se le pasa la respectiva jornada
  const statsMañana = await statsRepository.getVotos(1);
  const statsTarde = await statsRepository.getVotos(2);
  const statsNoche = await statsRepository.getVotos(3);
  const statsVirtual = await statsRepository.getVotos(4);

//en caso de que no sea null se ejecuta el algoritmo de separacion de candidatos y cantidad de votos
  if(statsMañana || statsTarde || statsNoche || statsVirtual != null){
     //se cuentas cuantos votos tiene cada persona, y se adjunta con la cedula del candidato
  const votosMañana = countVotos(statsMañana[0]);
  const votosTarde = countVotos(statsTarde[0]);
  const votosNoche = countVotos(statsNoche[0]);
  const votosVirtual = countVotos(statsVirtual[0]);

  //se guarda el objeto con todos los datos en objetos de votosJornada
  const allStats = { votosMañana, votosTarde, votosNoche, votosVirtual };

  return allStats;

  }else{
    //en caso de que la consulta haya fallado se devuelve un mensaje de error y un codigo de estatus
    return {message:'error en el servidor',status:500}
  }
 
  //funcion de contar los votos
  function countVotos(statsArray) {
    //recibe el array de las estadisticas de la jornada
    const mapa = {};
    //se crea un objeto  
    statsArray.forEach((e) => {
      //se recorre el array de las estadisticas de los candidatos
      mapa[e.cedula_candidato] = e.cantidad_votos;
      //se guarda en el objeto como clave la cedula del candidato y como valor la cantidad de votos
    
    });

    return mapa;
  }
};

module.exports = {
  getEstadisticas,
};
