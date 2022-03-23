const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if( err ){  
                console.log(err)
                reject('No se pudo generar Token')
            }
            resolve( token )
        })
    })
}

module.exports = {    
    generarJWT
}


















/*
jwt.sign()   ==> crea el json web token parametros ( 
    primero -> payload que es lo que se va a mostrar
    segundo -> private key que es una palabra secreta a la que nadie mas debe tener acceso ya que pone en peligro la seguridad se mi app, esta en mis variables de entorno.
    tercero -> firma que es donde puedo modificar la duracion y expiracion del token )
    cuarto -> callback que se va a dispara en caso de no poderse firmar y de haber algun error

*/