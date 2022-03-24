const { Schema, model } = require('mongoose');



const EventoSchema = Schema({

    title: {
        type:String,
        required: true
    },
    notes:{
        type:String
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }


});

//Aqui puedo especificar como quiero que serialice el el evento, es decir como quiero que se muestren las propiedades las que no quiero que se muestren
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject()
    object.id = _id;
    return object;
})
//esto solo se ejecuta al hacer el llamado el toJson no estoy haciendo modificaciones a la base de datos directamente



module.exports = model('Evento', EventoSchema)













/*
Este modelo de evento esta diseñado en base a la app Calendar-app que crea un evento en el calendario con estas caracteristicas.

user: de lo mas importante es saber quien grabo o creo el evento 
type: Schema.Types.ObjectId   ===> le dice a mongoos que esto es una referencia y se especifica como ref: "Usuario" que es el usuario que recibimos en el autSchema

el .method es una propiedad propia de mongoose que me permite manipular la forma en que se serealiza el objeto al que hace referencia. "ESTO SOLO SE EJECUTA CUANDO LLAMO EL toJson"
this.toObject()   ==> obtengo la referencia a todo el objeto y me da acceso a cada una de las propiedades que tiene.

{ __v, _id, ...object }  ==> desestructuro la __v(version) y el _id para remplazarlos por los nombres de las variables como quiero que se vea el objeto
    y todas las demas propieades van a estar almacenadas en el object y se lo indico con el operador Spreed

*/

    