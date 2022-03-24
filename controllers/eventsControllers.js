const {response} = require('express')
const { generarJWT } = require('../helpers/jwt')
const Evento = require('../models/evento-models')





const getEventos = async( req, res=response ) => {

    const eventos = await Evento.find()
                                .populate('user','name')

    res.json({
        ok: true,
        msg: 'getEventos',
        eventos: eventos
    })

}


const crearEvento = async( req, res=response ) => {

    const evento = new Evento( req.body )

    try {
        
        evento.user = req.uid                                   //el usuario debe estar logueado en este punto ya tengo el id del user en la req gracias a el login

        const eventoGuardado = await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:'false',
            msg: 'Comuniquese con el administrador'
        })

    }


}


const actualizarEvento = async( req, res=response ) => {

    const eventoId = req.params.id
    const uid = req.uid                              //en este punto puedo obtener el id del evento que se va a actualizar
    
    try {

        const evento = await Evento.findById( eventoId )        //busca en la variable Evento el id del evento que coincida con el id eventoId
        
        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento con ese id no existe'
            })
        }

        //verifica si el usuario que quiere actualizar el evento es el mismo que esta loggueado
        if( evento.user.toString() !== uid ){                      
            return res.status(401).json({
                ok:false,
                msg:'Usuario no tiene permiso para ejecutar esta acción'
            })
        }

        //si llega a este punto quiere decir que el evento existe y que el usuario loggueado es el mismo que lo quiere actualizar
        const nuevoEvento = {           //nueva data
            ...req.body,
            user: uid
        }

        //actualizacion del evento primer parametro el id del evento que se va a actualizar, segundo la nueva data y tercero configuraciones adicionales
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {  new:true} )

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}


const eliminarEvento = async( req, res=response ) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {
        
        const evento = await Evento.findById( eventoId )

        if( !evento ){
            return res.status(404).json({
                ok:false,
                msg:'Evento no ese id no existe'
            })
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'Usuario no tiene permiso para ejecutar esta acción'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        res.json({
            ok:true,
            msg: 'Evento eliminado correctamente'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}


















/*
Evento.find()  ==> busca los eventos creados dentro de la variable que le indique en este caso Evento, dentro del find podria crear paginaciones o especificaciones de
como quiero que se vea el contenido de los que esto me retorna.

.populate('user','name')  ==> expande la informacion que le indique como primer parametro y como segundo parametro lo que quiero que se muestre al expandirse

status(404)    ==> cuando algo no existe en internet
status(401)    ==> Usuario no esta autorizado a ejecutar accion

if( evento.user.toString() !== uid )    ==>esto confirma que tengo un error y que el usuario que esta intentando modificar el evento no corresponde al que lo creo.

nuevoEvento   ==> si llega a este punto quiere decir que el evento existe y que el usuario loggueado es el mismo que lo quiere actualizar,
    desestructure lo que viene en el body de la req pero como esta req no tiene el id del usuario se lo mando en este punto

eventoActualizado    ==> actualizacion del evento primer parametro el id del evento que se va a actualizar, segundo la nueva data y tercero configuraciones adicionales
    al actualizar el evento por defecto me va a retornar primero el evento antiguo como medida opcional para que yo compare el antiguo con el nuevo, peor si quiero que 
    esto no se muestre mando como tercer parametro en las configuraciones adicionales { new:true } con esta opcion solo me va a mostrar el nuevo evento o la actualizacion

*/