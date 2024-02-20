
# Votaciones Sena v2

una API creada para manejar las votaciones de representantes de jornada del SENA 

## Estado del Projecto 

en desarollo 


## Uso de los Endpoints

Puedes utilizar los siguientes endpoints directamente desde railway, render o en su defecto de manera local:


#### Validar credenciales
- `POST https://votaciones.up.railway.app/api/v2/login`: Valida credenciales
- `POST https://votaciones-10lp.onrender.com/api/v2/login`: Valida credenciales
- `POST http://localhost:(tu_puerto)/api/v2/login`: Valida credenciales



Envía una solicitud POST con tus credenciales:
```bash
curl -X POST https://el_dominio_elegido/api/v2/login \
  -H "Content-Type: application/json" \
  -d '{
    "cedula": "123",
    "ficha": "234",
  }'
```
- recibiras la informacion de los candidatos de la jornada del aprendiz que logeaste.`json`
- en caso de iniciar con las credenciales del administrador, te mandara als estadisticas totales de todos los candidatos.`json`
- en caso de errores, te mandara el error correspondiente. `json`
 

#### Insertar Voto
- `POST https://votaciones.up.railway.app/api/v2/votos`: Insertar Voto
- `POST https://votaciones-10lp.onrender.com/api/v2/votos`: Insertar Voto
- `POST http://localhost:(tu_puerto)/api/v2/votos`: Insertar Voto


Envía una solicitud POST con tus credenciales:
```bash
curl -X POST https://el_dominio_elegido/api/v2/votos \
  -H "Authorization: Bearer tu_token_jwt" || "x-access-token: Bearer tu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "candidatoID": "ID_DEL_CANDIDATO"
  }'
```
- recibiras un mensaje de exito si el voto fue creado.`json`
- en caso de error recibiras el mensaje de error correspondiente. `json`

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





