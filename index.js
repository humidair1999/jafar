var fs = require('fs');

var Jafar = function(opts) {
    var that = this,
        // TODO: would need error handling to ensure opts exists at all
        inputJson = opts.json ? opts.json : null;

    if (!inputJson || (typeof(inputJson) !== 'object' && typeof(inputJson) !== 'string')) {
        throw new Error('You must pass a reference to a valid JSON object/file into Jafar constructor!');
    }

    this.json = (typeof(inputJson) === 'object') ? inputJson : this.readJsonFile(inputJson);
};

Jafar.prototype.readJsonFile = function(input) {
    try {
        return JSON.parse(fs.readFileSync(input));
    }
    catch(err) {
        throw new Error('Input JSON file could not be read!');
    }
};

Jafar.prototype.displayJson = function() {
    //console.log(this.json);
};

Jafar.prototype.listAllKeys = function() {
    var keys = [];

    function recurseObjectKeys(obj) {
        for (var key in obj) {
            keys.push(key);

            if (typeof obj[key] === "object") {
                recurseObjectKeys(obj[key]);
            }
        }
    }

    recurseObjectKeys(this.json);

    // for (var key in this.json) {
    //     keys.push(key);
    // }

    console.log('keys: ', keys);
    return keys;
};

Jafar.prototype.listAllValues = function() {
    var values = [];

    function recurseObjectValues(obj) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                recurseObjectValues(obj[key]);
            }
            else {
                values.push(obj[key]);
            }
        }
    }

    recurseObjectValues(this.json);

    console.log('values: ', values);
    return values;
};

module.exports = Jafar;