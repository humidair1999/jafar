var assert = require('assert'),
    Jafar = require('../index');

describe('TODO', function() {
    it('TODO', function() {
        var jafar = new Jafar({
            json: './test/sample.json'
        });

        jafar.displayJson();
        jafar.listAllKeys();
        jafar.listAllValues();

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

        jafar2.displayJson();
        jafar2.listAllKeys();
        jafar2.listAllValues();

        //assert.equal(TODO, TODO);
    });
});