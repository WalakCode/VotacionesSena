const db = require('../../config/db')

const verifyUser = async(cedula)=>{
    try{
        const status = await db.query(`SELECT ficha FROM public.votantes JOIN public.fichas ON public.votantes.ficha = public.fichas.id WHERE cedula = $1 AND public.fichas.codigo = $2`,cedula)
        return status
    }catch(error){
        console.log(error)
        return null
    }
}

const getJornada = async(ficha)=>{
    try{
        const jornada = await db.query(`SELECT jornada FROM public.fichas WHERE id = $1`,ficha)
        return jornada
    }catch(error){
        console.log(error)
        return null
    }
}


module.exports = {
    verifyUser,
    getJornada
}