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

    describe('.listAllKeys()', function() {
        it('should list array of all keys found within .json object', function() {
            assert.equal(jafar.listAllKeys().join(), ['thing', 'another', 'thing2', 'another2', 'thing3', 'thing4', 'thing5thing5'].join());
        });
    });

    describe('.findKey()', function() {
        it('should find index of key found within keys array', function() {
            assert.strictEqual(jafar.findKey('thing3'), 4);
        });
    });
});