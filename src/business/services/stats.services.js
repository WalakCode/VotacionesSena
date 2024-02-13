const userRepository = require("../../persistence/repository/stats.repository");

const getEstadisticas = async()=>{

    // const statsMañana = await userRepository.getVotos(1)
    // const statsTarde = await userRepository.getVotos(2)
    // const statsNoche = await userRepository.getVotos(3)
    // const statsVirtual = await userRepository.getVotos(4)

    
    // const votosMañana = votosJornada(statsMañana)
    // const votosTarde = votosJornada(statsTarde)
    // const votosNoche = votosJornada(statsNoche)
    // const votosVirtual= votosJornada(statsVirtual)

    // const mañanaFrecuency = votosFrecuency(votosMañana)
    // const tardeFrecuency = votosFrecuency(votosTarde)
    // const nocheFrecuency = votosFrecuency(votosNoche)
    // const virtualFrecuency = votosFrecuency(votosVirtual)


    // console.log(tardeFrecuency)



    // function votosFrecuency(array){
    //     let contador = {}

    //     for(let i = 0; i < array.votos.length; i++){
    //         const voto = array.votos[i]
    //         contador[array.nombres[i]] = (contador[voto] || 0)  + 1
    //     }
    //     return contador
    // }




    // function votosJornada (objeto){
    //     const votos = []
    //     const nombres = []
    //     objeto[0].forEach(element => {
    //         votos.push(element.id_candidato)
    //         nombres.push(element.nombre)
    //     });
    //     return {votos, nombres}
    // }

}


module.exports = {
    getEstadisticas
}