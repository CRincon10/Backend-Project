const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        // await mongoose.connect(process.env.DB_CNN, console.log('db_online'))
        await mongoose.connect( process.env.DB_CNN )
        console.log('db online')
    } catch (error) {
        console.log('Error initializing DB')
    }
}

module.exports = dbConnection














/*
Conexion a la base de datos de mongoDB

*/