var assert = require('assert'),
    Jafar = require('../index');

describe('TODO', function() {
    it('TODO', function() {
        var jafar = new Jafar({
            json: './test/sample.json'
        });

        jafar.displayJson();

        //assert.equal(TODO, TODO);
    });

    it('TODO', function() {
        var jafar2 = new Jafar({
            json: {
                "thing": {
                    "another": "something"
                }
            }
        });

        jafar2.displayJson();

        //assert.equal(TODO, TODO);
    });
});