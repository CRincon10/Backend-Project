const moment = require('moment')

const isDate = ( value ) => {

    if ( !value ){              //si la fecha no es valida o esta vacia retorne un falso
        return false
    }

    const fecha = moment( value )       //momento convierte lo que sea que contenga el value en una fecha

    if ( fecha.isValid() ){             //funcion propia de moment para validar si es o no valida la fecha
        return true
    }else{
        return false
    }


}



module.exports = {
    isDate
}



































/*
los valores que recibe como argumentos son propios de expres-validator y son los que me sirven para confirmar si es una fecha valida o no. 
la documentacion esta en la pagina de express-validator



*/