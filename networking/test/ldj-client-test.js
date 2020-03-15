'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
    let stream = null;
    let client = null;

    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    // Add a unit test for a single message that is split over two or more data evetns from the stream:
    it('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            done();
        });
        stream.emit('data', '{"foo":"bar"}\n');
        process.nextTick(() => stream.emit('data', '"bar"}\n'));
    });

    // Add a unit test that passes in null to the LDJClient constructor, and asserts that an error is thrown:
    it('Throw an error if a null is passed to the LDJClient constructor', done => {
        assert.throws(() => {
          new LDJClient(error);
        });
        done();
      });

      it('Thrown an exeption if the data is not a properly formatted JSON', done => {
        assert.throws(() => {
          stream.emit('data', '{"foo:\n');
        });
        done();
      });


});