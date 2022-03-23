
const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario-models')
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async(req, res = response) => {              //ruta / donde se hace la peticion
    
    const { email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email })
        // console.log(usuario)
        
        if( usuario ){
            res.status(400).json({
                ok: false,
                msg: 'Usuario ya registrado con este correo electronico'
            })
        }
        
        usuario = new Usuario( req.body )
         
        //encriptado de contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt )

        await usuario.save()

        //generar JWT para autenticacion automaticamente seguido del register
        const token = await generarJWT( usuario.id, usuario.name )


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })
    }
} 

const loginUsuario = async(req, res = response) => {              
    
    const { email, password } = req.body


    try {

        const usuario = await Usuario.findOne({ email })

        if( !usuario ){                             //si el usuario no existe
            return res.status(400).json({
                ok: false,
                msg: 'Usuario con este email no existe'
            })
        }

        //confirmar y comparar las contraseñas es decir la que esta en la base de datos con la que se esta en la req
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if ( !validPassword ){              //si las contraseñas no coinciden
            res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //si todo sale bien y el usuario y contraseña coinciden se puede generar el JWT
        const token = await generarJWT( usuario.id, usuario.name )


        //si todo incluido el JWT esta ok se genera respuesta en true al usuario 
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Login false Comuniquese con el administrador'
        })
    }



    
} 

const revalidarTokenUsuario = (req, res = response) => {              //ruta / donde se hace la peticion
    res.json({
        ok: true,
        msg: 'renew'
    })
} 



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarTokenUsuario
}















/*
res = express.response   ==> junto a la importacion de express es para poder tener la ayuda del inteligense autocompletado o sugerencias
cuando se escribe el codigo.

 if( name.length < 5 ){                                 ==> forma de hacer validaciones sin el express validator
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe tener minimo 5 caracteres'
        })
    }


status(400)    ==> bad request  (solicitud vacia)
status(201)    ==> ususario se creo correctamente


Encriptacion de una sola via
genSaltSync         ==> son los saltos que va a dar el bcrypt para encriptar la contraseña por defecto da 10 pero le puedo indicar los que yo quiera claro esta
a mas saltos mas pesada y mas dificil va a ser la recuperacion de la contraseña.

loginUsuario     ==> hace la autenticacion del usuario y da paso para generar el JWT jsonWebToken

generarJWT   ==>  generacion del token importado de los helpers
*/