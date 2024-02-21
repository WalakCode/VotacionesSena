const request = require('supertest')
const app = require('../src/app')

describe('POST /api/login',()=>{

    const aprendiz = {
        cedula:"1007506451",
        ficha:"2560414"
    }
    const admin ={
        cedula:"colombia62T",
        ficha:"622022*"
    }

    test('should respond with 202 for user',async()=>{
        const response = await request(app).post('/api/login').send(aprendiz)
        expect(response.statusCode).toBe(202)
     
    })

    test('message should be an user',async()=>{
        const response = await request(app).post('/api/login').send(aprendiz)
        expect(response.body.message).toEqual(expect.stringContaining("user"))
    })

    test('should have a token:x-access-token or authorization in header ',async()=>{
        const response = await request(app).post('/api/login').send(aprendiz)
        expect(response.header.authorization).toEqual(expect.stringContaining("Bearer"))
    })

    test('info should have an array',async()=>{
        const response = await request(app).post('/api/login').send(aprendiz)
        expect(response.body.info).toBeInstanceOf(Array)
    })

    test('info should have data',async()=>{
        const response = await request(app).post('/api/login').send(aprendiz)
        expect(response.body.info.length).toBeGreaterThan(0)
    })

    test('shoul respond with 400 (espacios en blanco)',async()=>{
        const response = await request(app).post('/api/login').send({cedula:"",ficha:""})
        expect(response.statusCode).toBe(400)
    })

    test('message should be espacios en blanco' ,async()=>{
        const response = await request(app).post('/api/login').send()
        expect(response.body).toEqual(expect.stringContaining("espacios en blanco"))
        
    })

    test('shoul respond with 400 (ficha o cedula valida)',async()=>{
        const response = await request(app).post('/api/login').send({cedula:"1ASD",ficha:"1ASD"})
        expect(response.statusCode).toBe(400)
    })

    test('message should be ficha o cedula valida' ,async()=>{
        const response = await request(app).post('/api/login').send({cedula:"1ASD",ficha:"1ASD"})
        expect(response.body).toEqual(expect.stringContaining("ficha o cedula valida"))
    })

    test('shoul respond with 404 (no existe cedula o ficha )',async()=>{
        const response = await request(app).post('/api/login').send({cedula:"12345",ficha:"12345"})
        expect(response.statusCode).toBe(404)
    })

    test('message should be no existe cedula o ficha' ,async()=>{
        const response = await request(app).post('/api/login').send({cedula:"123452314",ficha:"12345234"})
        console.log(response.body)
        expect(response.body).toEqual(expect.stringContaining("no existe cedula o ficha"))
    })

})