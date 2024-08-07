require('dotenv').config();

const app = require('./app');
require('./database');
// esta logica es para ejecutra el servidor

async function main() {
    await app.listen(app.get('port'));
    console.log('Server se esta ejecutando en el puerto: ', app.get('port'));
}

main();

