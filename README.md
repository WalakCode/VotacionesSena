
# Votaciones Sena v2

una API creada para manejar las votaciones de representantes de jornada del SENA 

## Estado del Projecto 

en desarollo 


## Uso de los Endpoints




#### Endpoint POST /api/v2/login 

esta solicitud permite validar credenciales de los aprendices o administrador para asi logearlos respectivamente 

Parametros:
- cedula: cedula del aprendiz o credencial de administrador
- ficha: ficha del aprendiz o credencial del administrador 

cuerpo de la solicitud:

```
{
  "cedula": "123",
  "ficha": "456"
}
```

Ejemplo de solicitud 

```
curl -X POST https://el_dominio_elegido/api/v2/login \
  -H "Content-Type: application/json" \
  -d '{
    "cedula": "123",
    "ficha": "456",
  }'
```

Ejemplo de respuesta:

```
HTTP/1.1 202 OK
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE1MTYyMzkwMjJ9.C-Zg7GKFHszKZf3gRfj90nDsGOM03luc69MlnpB2D6o

{
  "message": "user autenticado"
}

```
#### Endpoint GET /api/v2/candidatos 

esta solicitud permite traer todos los candidatos de la jornada del aprendiz logeado (solo para users)


Parametros:


- Authorization (Encabezado): JWT token (Sin el Bearer)

header de la solicitud 
```
  -H "Authorization: Bearer tu_token_jwt_aqui" 
```
Ejemplo de solicitud 


```
curl -X GET -H "Authorization: Bearer tu_token_jwt_aqui" 
https://el_dominio_elegido/api/v2/candidatos

```
Ejemplo de respuesta:
```
{
    "message": "candidatos obtenidos",
    "info": [
        {
            "id_candidatos": 1,
            "cedula": 1234,
            "nombre": "jhon",
            "apellido": "doe",
            "ciudad": "bogota",
            "ficha": 456,
            "img_candidato": "imagenCandidato1.png",
            "img_tarjeton": "imagenTarjeton1.png",
            "tarjeton": "02",
            "plan_gob1": "mi plan de gobierno es...",
            "plan_gob2": "mi plan de gobierno es...",
            "plan_gob3": "mi plan de gobierno es...",
            "perfil_personal": "me considero...",
            "slogan": "todos juntos para un futuro mejor",
            "jornada": "tarde"
        }
    ]
}
``` 

#### Endpoint POST /api/v2/votos

esta solicitud permite insertar un voto del aprendiz logeado a un candidato a eleccion, de la jornada pertenecientes 

Parametros:

- Authorization (Encabezado): JWT token (Sin el Bearer)
- candidatoID: ID del candidato al cual el aprendiz quiere votar


header de la solictud:
```
  -H "Authorization: Bearer tu_token_jwt_aqui" 
```
cuerpo de la solicitud:

```
{
  "candidatoID": "1",
}
```
Ejemplo de solicitud 

```
curl -X POST https://el_dominio_elegido/api/v2/votos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_jwt_aqui" \
  -d '{
    "candidatoID": "1"
  }'

```

Ejemplo de respuesta:

```
HTTP/1.1 201 OK
Content-Type: application/json
{
  "message": "la persona realizo el voto"
}

```

#### Endpoint GET /api/v2/estadisticas 

esta solicitud permite traer todas las estadisticas de los canditdatos y jornadas, (solo para admin)


Parametros:


- Authorization (Encabezado): JWT token (Sin el Bearer)

header de la solicitud 
```
  -H "Authorization: Bearer tu_token_jwt_aqui" 
```
Ejemplo de solicitud 


```
curl -X GET -H "Authorization: Bearer tu_token_jwt_aqui" 
https://el_dominio_elegido/api/v2/estadisticas

```
Ejemplo de respuesta:
```
{
    "message": "estadisticas",
    "info": {
        "votosMañana": {
            "12": 2,
            "123123": 1,
            "1007506451": 0
        },
        "votosTarde": {
            "12": 2,
            "123123": 1,
            "1007506451": 0
        },
        "votosNoche": {
            "12": 2,
            "123123": 1,
            "1007506451": 0
        },
        "votosVirtual": {
            "12": 2,
            "123123": 1,
            "1007506451": 0
        },
        "votosBlancos": {
            "mañana": 0,
            "tarde": 1,
            "noche": 0,
            "virtual": 0
        }
    }
}
``` 

## Despliegue Local 

1. Clona el repositorio: `git clone https://github.com/WalakCode/VotacionesSena.git`

2. Ingresa al directorio: `cd VotacionesSena`


## Configuracion de entorno Local

1. Crea un archivo `.env` en la raíz del proyecto.
2. Configura las variables de entorno necesarias. Ejemplo:

```env
PORT=8080
DB_HOST=xxx
DB_NAME=xxx
DB_USER=xxx
DB_PASSWORD=xxxx
DB_PORT=xxxx
SK= Clave_secreta_JWT

```

## Instalación y Ejecución Local

1. Instala las dependencias:

```bash
npm install
```
2. Inicia la aplicacion:

```bash
npm start
```

3. asegurate de tener la base de datos en tu servidor, local o web junto con las configuraciones en el `.env`






"# VotacionesSenaApp" 
