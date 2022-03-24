/*
    Rutas del usuraio / Auth
    host + /api/auth
*/



const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { crearUsuario, loginUsuario, revalidarTokenUsuario } = require('../controllers/authControllers')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')



router.post( 
    '/new', 
    [//middleweres
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es obligatorio y debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos 
    ],
    crearUsuario 
)

router.post( 
    '/', 
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es obligatorio y debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] ,
    loginUsuario
)

router.get( '/renew', validarJWT, revalidarTokenUsuario )





module.exports = router;                  //forma de exportar de node












/*
Rutas de validacion o peticiones

middlewere    ==> son las acciones que se van a ejecutar antes o primero que el resto de codigo

check   ==> middlewere que se encarga de validar un campo en particular, el primer argumento es el campo que yo quiero evaluar,

/renew    ==> en el login cree el token pero en el renew y en todas las rutas de mi back en las que el usuario tiene que esta autenticado necesito saber si el JWT es valido
    es decir que no haya sido modificado o haya caducado (vencio el tiempo que le indique de duracion).
    El objetivo del renew es que donde yo lo llamo va a verificar el JWT actual y va a ejecutar el procedimiento para volver a generar un nuevo JWT que reemplaza el anterior
    con el objetivo de prolongar otras dos horas de experiencia de usuario, y tambien me sirve como metodo de autenticacion ejemplo si la persona salio de la app y vuelve a ingresar
    pero aun esta dentro del tiempo de uso permitido esta funcion va a actualizar el JWT y empieza nuevamente el tiempo de experiencia.

validarJWT   ==> middlewere para generacion de new JWT

*/