var assert = require('assert'),
    Jafar = require('../index');

describe('JSON loaded via file', function() {
    var jafar;

    beforeEach(function() {
        jafar = new Jafar({
            json: './test/sample.json'
        });
    });

    describe('constructor', function() {
        it('should attach .json property when valid JSON file loaded', function() {
            assert.ok(jafar.json);
        });
    });

    it('TODO', function() {
        var jafar = new Jafar({
            json: './test/sample.json'
        });

        // jafar.displayJson();
        // jafar.listAllKeys();
        // jafar.listAllValues();
        // jafar.findKey('thing2');
        // jafar.findValue('something2');

        //assert.equal(TODO, TODO);

        //jafar.findKey('thing');
    });
});