/*
    Event Router
    /api/events
*/

const {Router} = require('express');
const router = Router()
const { check } = require('express-validator')

const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/eventsControllers');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");


//indicacion de que todas las peticiones deben pasar por validar TOKEN
router.use( validarJWT )

router.get( '/', getEventos )

router.post( 
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio requerida').custom( isDate ),
        check('end','Fecha de finalización requerida').custom( isDate ),
        validarCampos
    ],
    crearEvento)

router.put( 
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],

    actualizarEvento )

router.delete( '/:id', eliminarEvento )






module.exports = router









/*
router.use( validarJWT )    ==> de esta forma indico que todas las rutas deben pasar por la validacion del JWT pero eso depende de la ubicacion donde este definida
es decir en este caso esta definida o llamada antes de la definicion de las rutas pero si yo quiero que alguna ruta sea publica la debo definir o llamar despues de esa
ruta.

check  ==> validador de express-validator no valida fechas es por eso que debo enviarle un validador custom() que dentro va a tener la funcion que va a validar la fecha
    en este caso lo llamo de los helpers isDate.js


*/