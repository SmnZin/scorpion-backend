require('dotenv').config();

const app = require('./src/app');
require('./src/database');
// esta logica es para ejecutra el servidor

async function main() {
    try {
        await app.listen(app.get('port'));
        console.log('Server se esta ejecutando en el puerto: ', app.get('port'));
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1); // Termina el proceso con un código de error
    }
}


main();

