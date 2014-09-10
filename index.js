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

// utility methods

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

// key viewing/replacing methods

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

Jafar.prototype.findKey = function(key) {
    var keys = this.listAllKeys();

    console.log(keys.indexOf(key));
};

Jafar.prototype.replaceKey = function(findString, replaceString) {
    var newObj = {};

    function cloneObject(obj) {
        var clone = {},
            replaceKey = null;

        for (var key in obj) {
            // if current object key matches the user's passed-in 'find' string,
            //  set clone key to 'replace' string; otherwise, maintain existing
            //  object key
            replaceKey = (key === findString) ? replaceString : key;

            // if currently-iterated key is NOT the lowest-level key/value
            //  pair, recurse over this sub-object to continue traversal
            if (obj[key] && typeof(obj[key]) === "object") {
                clone[replaceKey] = cloneObject(obj[key]);
            }
            // else if this key IS the lowest-level key/value pair, simply
            //  set the clone's key to the current object key
            else {
                clone[replaceKey] = obj[key];
            }
        }

        return clone;
    }

    newObj = cloneObject(this.json);

    console.log(this.json);
    console.log('------------------------------------------------------------');
    console.log(newObj);
};

// value viewing/replacing methods

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

Jafar.prototype.findValue = function(value) {
    var values = this.listAllValues();

    console.log(values.indexOf(value));
};

Jafar.prototype.replaceValue = function(findString, replaceString) {
    var newObj = {};

    function cloneObject(obj) {
        var clone = {},
            replaceValue = null;

        for (var key in obj) {
            // if currently-iterated key is NOT the lowest-level key/value
            //  pair, recurse over this sub-object to continue traversal
            if (obj[key] && typeof(obj[key]) === "object") {
                clone[key] = cloneObject(obj[key]);
            }
            // else if this key IS the lowest-level key/value pair, set the
            //  clone's value
            else {
                // if current object value matches the user's passed-in 'find' string,
                //  set clone value to 'replace' string; otherwise, maintain existing
                //  object value
                replaceValue = (obj[key] === findString) ? replaceString : obj[key];

                clone[key] = replaceValue;
            }
        }

        return clone;
    }

    newObj = cloneObject(this.json);

    console.log(this.json);
    console.log('------------------------------------------------------------');
    console.log(newObj);
};

module.exports = Jafar;