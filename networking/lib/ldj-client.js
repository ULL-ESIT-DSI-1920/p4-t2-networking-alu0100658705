'use strict';
const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmitter {
    constructor(stream) {
        super();
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);
                buffer = buffer.substring(boundary + 1);
                this.emit('message', JSON.parse(input));
                boundary = buffer.lastIndexOf('\n');
            }
        });

        stream.on('close', data =>  {
            let boundary = buffer.index('{');
            if (boundary !== -1) {
                const input = buffer.substring(0, boundary+1);
                try {
                    JSON.parse(input);
                } catch(e) {
                    throw Error("JSON FAIL");
                }
                this.emit('message', JSON.parse(input));
            }
            this.emit('close');
        });
    }

    static connect(stream) {
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;