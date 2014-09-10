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

    (function recurseObjectKeys(obj) {
        for (var key in obj) {
            keys.push(key);

            if (typeof obj[key] === "object") {
                recurseObjectKeys(obj[key]);
            }
        }
    })(this.json);

    console.log('keys: ', keys);
    return keys;
};

Jafar.prototype.replaceKey = function(findString, replaceString) {
    var newObj = {};

    function cloneObject(obj) {
        var clone = {},
            replaceKey;

        for (var key in obj) {
            replaceKey = (key === findString) ? replaceString : key;

            console.log(replaceKey);

            if (obj[key] && typeof(obj[key]) === "object") {
                console.log('67: ', key);
                clone[replaceKey] = cloneObject(obj[key]);
            }
            else {
                console.log('70: ', key);
                clone[replaceKey] = obj[key];
            }

            // console.log(clone);
            // console.log('\n');
        }

        return clone;
    }

    newObj = cloneObject(this.json);

    console.log(this.json);
    console.log('LOLOLOLOLOLOLOLO');
    console.log(newObj);
};

Jafar.prototype.listAllValues = function() {
    var values = [];

    (function recurseObjectValues(obj) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                recurseObjectValues(obj[key]);
            }
            else {
                values.push(obj[key]);
            }
        }
    })(this.json);

    console.log('values: ', values);
    return values;
};

Jafar.prototype.findKey = function(key) {
    var keys = this.listAllKeys();

    console.log(keys.indexOf(key));
};

Jafar.prototype.findValue = function(value) {
    var values = this.listAllValues();

    console.log(values.indexOf(value));
};

module.exports = Jafar;