/*
    Rutas del usuraio / Auth
    host + /api/auth
*/



const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { crearUsuario, loginUsuario, revalidarTokenUsuario } = require('../controllers/authControllers')
const { validarCampos } = require('../middlewares/validar-campos')



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

router.get( '/renew', revalidarTokenUsuario )





module.exports = router;                  //forma de exportar de node












/*
Rutas de validacion o peticiones

middlewere    ==> son las acciones que se van a ejecutar antes o primero que el resto de codigo

check   ==> middlewere que se encarga de validar un campo en particular, el primer argumento es el campo que yo quiero evaluar,

*/