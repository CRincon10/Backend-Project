const express = require('express');           //forma de importacion
const dbConnection = require('./database/config');
require('dotenv').config()                   //importacoion del dotenv

//servidor de express
const app = express();

// conexion a base de datos mongo
dbConnection()

//Directorio public
app.use( express.static('public') )     

//recibir informacion JSON  lectura y parseo del body      debe estar definido antes de las rutas
app.use( express.json() )

//rutas
app.use('/api/auth', require('./routes/auth') )    //midlewere con el path o ruta(todo lo relacionado a autenticacion va a estar relacionado en el auth) donde va a estar habilitado el endpoint que se indica en el require


//escuchar peticiones express   
app.listen(process.env.PORT, () => {
    console.log( `Servidor corriendo en puerto ${process.env.PORT}` )     
} )
















/*variables de entorno,
Cuando se despliegue el listen o aplicacion a un hostin yo no se que puerto me va a abrir, en desaroollo yo puedo poner cualquiera
per eventualmente puedo tener alguno en especifico, tambien voy a necesitar la cadena de coleccion a la base de datos es decir una llave
secreta con la cual voy a firmar mis tokens de entrada a la app entre otras cosas para el uso de variables de entorno.
Las variables de entorno se crean en un archivo con extension .env y realizar instalacion del npm i dotenv.

// console.log(process.env)   //puedo mirar todos los procesos instaladas en el env eviroment

//Directorio publico
app.use( express.static('public') )     //para que el localhost abra y muestre en pantalla el directorio public
//use en express es conocido como un midlewere que es una funcion que ejecuta algo cuando alguien hace una peticion a mi back


//escuchar peticiones express    listen('primer argumento el puerto, segundo argumento un callback que ejecuta algo cuando el servidor este levantado)
app.listen(process.env.PORT, () => {
    console.log( `Servidor corriendo en puerto ${process.env.PORT}` )     //numero de puerto esta guardado en el archivo de extension .env y lo puedo extraer de process.env.PORT
} )

app.use( express.json() )      debe estar definido antes de las rutas y lo que le dice a node es que parsee eutomaticamente todas los json que vengn como peticiones.




*/

 
