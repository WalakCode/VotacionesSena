const db = require('../../config/db')

const getUserInf = async (cedula) => {
    try {
        const status = await db.query(`SELECT id_votantes, cedula 
        FROM public.votantes 
        JOIN public.fichas ON public.votantes.ficha = public.fichas.id_fichas 
        WHERE cedula = $1 AND public.fichas.codigo = $2`, cedula)
        return status
    } catch (error) {
        console.log(error)
        return null
    }
}

const getVotanteJornada = async (ficha) => {
    try {
        const jornada = await db.query(`SELECT jornada 
        FROM public.fichas 
        WHERE codigo = $1`, ficha)
        return jornada
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCandidatoJornada = async (userID) => {
    try {
        const ficha = await db.query(`SELECT public.fichas.jornada
        FROM public.candidatos
        JOIN public.votantes ON public.candidatos.id_votantes_candidatos = public.votantes.id_votantes
        JOIN public.fichas ON public.votantes.ficha = public.fichas.id_fichas
        WHERE public.candidatos.id_candidatos = $1;`, userID)
        console.log(ficha)
        return ficha
    } catch (error) {
        console.log(error)
        return null
    }
}

const getFecha = async (userID) => {
    try {
        const voto = await db.query(`SELECT fecha 
        FROM public.votos 
        WHERE id_votante = $1 `, userID)
        return voto
    } catch (error) {
        console.log(error)
        return null
    }
}

const insertVotos = async (voto) => {
    try {
        const inserted = await db.query(`INSERT INTO public.votos (id_candidato, fecha, id_votante) 
        VALUES ($1,NOW(),$2)`, voto)
        return inserted
    } catch (error) {
        console.log(error)
        return null
    }
}


module.exports = {
    getUserInf,
    getVotanteJornada,
    getFecha,
    insertVotos,
    getCandidatoJornada,

}