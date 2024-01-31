const db = require('../../config/db')

const verifyUser = async(cedula)=>{
    try{
        const status = await db.query(`SELECT id_votantes, cedula FROM public.votantes JOIN public.fichas ON public.votantes.ficha = public.fichas.id_fichas WHERE cedula = $1 AND public.fichas.codigo = $2`,cedula)
        return status
    }catch(error){
        console.log(error)
        return null
    }
}

const getJornada = async(ficha)=>{
    try{
        const jornada = await db.query(`SELECT jornada FROM public.fichas WHERE codigo = $1`,ficha)
        return jornada
    }catch(error){
        console.log(error)
        return null
    }
}



module.exports = {
    verifyUser,
    getJornada,
}