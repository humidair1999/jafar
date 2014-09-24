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
            assert.strictEqual(jafar.listAllKeys().join(), ['thing', 'another', 'thing2', 'another2', 'thing3', 'thing4', 'thing5thing5'].join());
        });
    });

    describe('.findKey()', function() {
        it('should find index of key found within keys array', function() {
            assert.strictEqual(jafar.findKey('thing3'), 4);
        });
    });

    describe('.replaceKey()', function() {
        it('should replace non-exact matches of provided key in a non-global manner when isExact=false && isGlobal=false', function() {
            jafar.replaceKey('thing', 'hahaha', false, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"hahaha2":{"another2":"something2"},"hahaha3":{"hahaha4":{"hahaha5thing5":"something3"}}}');
        });

        it('should replace exact matches of provided key in a non-global manner when isExact=true && isGlobal=false', function() {
            jafar.replaceKey('thing', 'hahaha', true, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace exact matches of provided key in a global manner when isExact=true && isGlobal=true', function() {
            jafar.replaceKey('thing', 'hahaha', true, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace non-exact matches of provided key in a global manner when isExact=false && isGlobal=true', function() {
            jafar.replaceKey('thing', 'hahaha', false, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"hahaha2":{"another2":"something2"},"hahaha3":{"hahaha4":{"hahaha5hahaha5":"something3"}}}');
        });
    });

    describe('.listAllValues()', function() {
        it('should list array of all values found within .json object', function() {
            assert.strictEqual(jafar.listAllValues().join(), ['somethingsomething', 'something2', 'something3'].join());
        });
    });

    describe('.findValue()', function() {
        it('should find index of value found within values array', function() {
            assert.strictEqual(jafar.findValue('something3'), 2);
        });
    });

    describe('.replaceValue()', function() {
        it('should replace non-exact matches of provided value in a non-global manner when isExact=false && isGlobal=false', function() {
            jafar.replaceValue('something', 'hahaha', false, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"hahahasomething"},"thing2":{"another2":"hahaha2"},"thing3":{"thing4":{"thing5thing5":"hahaha3"}}}');
        });

        it('should replace exact matches of provided value in a non-global manner when isExact=true && isGlobal=false', function() {
            jafar.replaceValue('something', 'hahaha', true, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace exact matches of provided value in a global manner when isExact=true && isGlobal=true', function() {
            jafar.replaceValue('something', 'hahaha', true, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace non-exact matches of provided value in a global manner when isExact=false && isGlobal=true', function() {
            jafar.replaceValue('something', 'hahaha', false, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"hahahahahaha"},"thing2":{"another2":"hahaha2"},"thing3":{"thing4":{"thing5thing5":"hahaha3"}}}');
        });
    });
});

describe('JSON loaded via object', function() {
    var jafar;

    beforeEach(function() {
        jafar = new Jafar({
            json: {
                "thing": {
                    "another": "somethingsomething"
                },
                "thing2": {
                    "another2": "something2"
                },
                "thing3": {
                    "thing4": {
                        "thing5thing5": "something3"
                    }
                }
            }
        });
    });

    describe('constructor', function() {
        it('should attach .json property when valid JSON file loaded', function() {
            assert.ok(jafar.json);
        });
    });

    describe('.listAllKeys()', function() {
        it('should list array of all keys found within .json object', function() {
            assert.strictEqual(jafar.listAllKeys().join(), ['thing', 'another', 'thing2', 'another2', 'thing3', 'thing4', 'thing5thing5'].join());
        });
    });

    describe('.findKey()', function() {
        it('should find index of key found within keys array', function() {
            assert.strictEqual(jafar.findKey('thing3'), 4);
        });
    });

    describe('.replaceKey()', function() {
        it('should replace non-exact matches of provided key in a non-global manner when isExact=false && isGlobal=false', function() {
            jafar.replaceKey('thing', 'hahaha', false, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"hahaha2":{"another2":"something2"},"hahaha3":{"hahaha4":{"hahaha5thing5":"something3"}}}');
        });

        it('should replace exact matches of provided key in a non-global manner when isExact=true && isGlobal=false', function() {
            jafar.replaceKey('thing', 'hahaha', true, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace exact matches of provided key in a global manner when isExact=true && isGlobal=true', function() {
            jafar.replaceKey('thing', 'hahaha', true, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace non-exact matches of provided key in a global manner when isExact=false && isGlobal=true', function() {
            jafar.replaceKey('thing', 'hahaha', false, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"hahaha":{"another":"somethingsomething"},"hahaha2":{"another2":"something2"},"hahaha3":{"hahaha4":{"hahaha5hahaha5":"something3"}}}');
        });
    });

    describe('.listAllValues()', function() {
        it('should list array of all values found within .json object', function() {
            assert.strictEqual(jafar.listAllValues().join(), ['somethingsomething', 'something2', 'something3'].join());
        });
    });

    describe('.findValue()', function() {
        it('should find index of value found within values array', function() {
            assert.strictEqual(jafar.findValue('something3'), 2);
        });
    });

    describe('.replaceValue()', function() {
        it('should replace non-exact matches of provided value in a non-global manner when isExact=false && isGlobal=false', function() {
            jafar.replaceValue('something', 'hahaha', false, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"hahahasomething"},"thing2":{"another2":"hahaha2"},"thing3":{"thing4":{"thing5thing5":"hahaha3"}}}');
        });

        it('should replace exact matches of provided value in a non-global manner when isExact=true && isGlobal=false', function() {
            jafar.replaceValue('something', 'hahaha', true, false);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace exact matches of provided value in a global manner when isExact=true && isGlobal=true', function() {
            jafar.replaceValue('something', 'hahaha', true, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"somethingsomething"},"thing2":{"another2":"something2"},"thing3":{"thing4":{"thing5thing5":"something3"}}}');
        });

        it('should replace non-exact matches of provided value in a global manner when isExact=false && isGlobal=true', function() {
            jafar.replaceValue('something', 'hahaha', false, true);

            assert.strictEqual(JSON.stringify(jafar.json), '{"thing":{"another":"hahahahahaha"},"thing2":{"another2":"hahaha2"},"thing3":{"thing4":{"thing5thing5":"hahaha3"}}}');
        });
    });
});