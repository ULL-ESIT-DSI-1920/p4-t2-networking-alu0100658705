'use strict';
const netClient = require('net').connect({port: 60300});
const ldjClient = require('./lib/ldj-client.js').connect(netClient);

ldjClient.on('message', message => {
    if (message.type === 'watching') {
        console.log(`Ahora observando: ${mesagge.file}`);
    } else if (message.type === 'changed') {
        console.log(`Archivo modificado: ${new Date(message.timestamp)}`);   
    } else {
       throw Error(`Tipo de mensaje desconocido: ${mesagge.type}`);
    }
});
