'use strict';
const net = require('net');
const client = net.connect({port: 60300});
client.on('data', data => {
    const message = JSON.parse(data);
    if (message.type === 'watching') {
        console.log(`Ahora observando: ${message.file}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`Archivo modificado: ${date}`);   
    } else {
        console.log(`Tipo de mensaje desconocido: ${message.type}`);
    }
});