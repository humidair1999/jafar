var assert = require('assert'),
    Jafar = require('../index');

describe('errors thrown when insufficient options provided to constructor', function() {
    it('should throw an error when no json option is provided', function() {
        assert.throws(function() {
            var jafar = new Jafar();
        });
    });

    it('should throw an error when invalid json is provided', function() {
        assert.throws(function() {
            var jafar = new Jafar({
                json: 123
            });
        });
    });

    it('should throw an error when invalid json file location is provided', function() {
        assert.throws(function() {
            var jafar = new Jafar({
                json: './test/fake.json'
            });
        });
    });
});

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