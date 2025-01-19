const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB

const dbConnection = async() => {

    try {
        await mongoose.connect(`mongodb://${DB}/blogs`); // DB = 127.0.0.1:27017
        console.log('DB Conectado')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos');
    }
};

module.exports = dbConnection;
