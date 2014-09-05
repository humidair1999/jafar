var assert = require('assert'),
    Jafar = require('../index');

describe('TODO', function() {
    it('TODO', function() {
        var jafar = new Jafar({
            json: './test/sample.json'
        });

        // jafar.displayJson();
        // jafar.listAllKeys();
        // jafar.listAllValues();
        // jafar.findKey('thing2');
        // jafar.findValue('something2');

        jafar.replaceKey('thing2');

        //assert.equal(TODO, TODO);

        console.log('-----------------------------------------------------------');
    });

    it('TODO', function() {
        var jafar2 = new Jafar({
            json: {
                "thing": {
                    "another": "something"
                },
                "thing2": {
                    "another2": "something2"
                },
                "thing3": {
                    "thing4": {
                        "thing5": "something3"
                    }
                }
            }
        });

        // jafar2.displayJson();
        // jafar2.listAllKeys();
        // jafar2.listAllValues();
        // jafar2.findKey('thing2');
        // jafar2.findValue('something2');

        //jafar2.replaceKey('thing2');

        //assert.equal(TODO, TODO);
    });
});