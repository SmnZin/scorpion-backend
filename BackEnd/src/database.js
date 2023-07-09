const mongoose = require('mongoose');
require('dotenv').config();

// cadena de conexion a la base de datos(de momento ocupando la local), aca tengp que cambiar  el archivo .env para conectar a la base de datos de mongo atlas
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/databasetest';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('base de datos conectada: ', URI);
});