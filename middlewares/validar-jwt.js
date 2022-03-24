const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = ( req, res = response, next ) => {

    //TOKEN CON NOMBRE x-token
    const token = req.header('x-token')

    if( !token ){
        return res.status(401).json({
            ok:false,
            msg: 'No se genero token para usuario'
        })
    }
    

    try {

        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED )
        const {uid, name} = payload

        req.uid = uid
        req.name = name


    } catch (error) {                   //catch solo se dispara si la validacion del token falla
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }




    next()

}





module.exports = {
    validarJWT
}







/* el req de esta petiocion se prueba con postman 

la forma en que se lee el token tiene que ser igual a la forma en que se genero
para la verificaion del token necesito extraer el payload ya que necesito el uid y el name del usuario con:
jwt.verify() ==> que recibe el token y el secretKey o firma para validar que esta correctamente firmado es decir que este literalemte como fue generado, cualquier modificacion
al mismo va a ser invalidado.

puedo modificar la req con el payload que extraje con jwt.varify() y la req va a pasar estos nuevos valores por referencia a cualquier funcion que siga llamada con el next()

status(401)    ==> usuario no esta validado o no existe token de validacion

*/
