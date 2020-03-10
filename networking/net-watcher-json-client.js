'use strict';
const net = require('net');
const client = net.connect({port: 60300});
client.on('data', data => {
    const mesagge = JSON.parse(data);
    if (mesagge.type === 'watching') {
        console.log(`Ahora observando: ${mesagge.file}`);
    } else if (mesagge.type === 'changed') {
        const date = new Date(mesagge.timestamp);
        console.log(`Archivo modificado: ${date}`);   
    } else {
        console.log(`Tipo de mensaje desconocido: ${mesagge.type}`);
    }
});