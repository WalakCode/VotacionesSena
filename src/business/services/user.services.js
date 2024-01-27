const userRepository = require('../../persistence/repository/user.repository')

const loginUser = async (info) => {
    if(info.cedula && info.ficha){
        if (isNaN(info.cedula) || isNaN(info.ficha)) {
            return {error:'ecriba ficha o cedula valida (numero)'}
        } else {
            const cedula = parseInt(info.cedula)
            const ficha = parseInt(info.ficha)
            const status = await userRepository.verifyUser([cedula, ficha])
            if (status.rows.length > 0){
                const fichaID = parseInt(status.rows[0].ficha)
                console.log(fichaID)
                const jornada = await userRepository.getJornada([fichaID])
                const jornadaID = parseInt(jornada.rows[0].jornada)
                console.log(jornadaID)
                return jornadaID
            }else{
                return {error:'no existe cedula o ficha'}
            }
        }
    }else{
        console.log('asd')
       return {error:'espacios en blanco'}
    }
    
}

module.exports = {
    loginUser
}