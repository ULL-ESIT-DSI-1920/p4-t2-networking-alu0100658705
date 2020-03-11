'use stric';
const server = require('net').createServer(connection => {
    console.log('Subscriber connected.');

    // Dos fragmentos que juntos forman un mensaje
    const firstChunck = '{"type":"changed","timesta';
    const secondChunck = 'mp":10101201011010}\n';

    // Enviamos el primer fragmento inmediatamente
    connection.write(firstChunck);

    // Después de cierto delay, enviamos el otro fragmento
    const timer = setTimeout(() => {
        connection.write(secondChunck);
        connection.end();
    }, 100);

    // Reseteamos el timer cuando termina la conexión
    connection.on('end', () => {
        clearTimeout(timer);
        console.log('Subscriber disconnected');
    });
});

server.listen(60300, function() {
    console.log('Test server listening for subscribers...');
});