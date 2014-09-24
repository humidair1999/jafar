var fs = require('fs');

var Jafar = function(opts) {
    var that = this,
        inputJson = null;

    if (!opts) {
        throw new Error('Cannot initialize Jafar without any options!');
    }

    inputJson = opts.json ? opts.json : null;

    if (!inputJson || (typeof(inputJson) !== 'object' && typeof(inputJson) !== 'string')) {
        throw new Error('You must pass a reference to a valid JSON object/file into Jafar constructor!');
    }

    this.json = (typeof(inputJson) === 'object') ? inputJson : this._readJsonFile(inputJson);
};

// utility methods

Jafar.prototype._readJsonFile = function(input) {
    try {
        return JSON.parse(fs.readFileSync(input));
    }
    catch(err) {
        throw new Error('Input JSON file could not be read!');
    }
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

    return keys;
};

Jafar.prototype.findKey = function(key) {
    var keys = this.listAllKeys();

    return keys.indexOf(key);
};

Jafar.prototype.replaceKey = function(keyToFind, replacementKey, isGlobal) {
    var cloneObject = function(obj) {
        var clone = {},
            replaceKey = null,
            findRegEx = new RegExp(keyToFind, (isGlobal ? 'g' : ''));

        for (var key in obj) {
            // if current object key matches the user's passed-in 'find' string,
            //  set clone key to 'replace' string; otherwise, maintain existing
            //  object key
            replaceKey = (key.indexOf(keyToFind) > -1) ? key.replace(findRegEx, replacementKey) : key;

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

    console.log(this.json);

    this.json = cloneObject(this.json);

    console.log(this.json);
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

Jafar.prototype.replaceValue = function(valueToFind, replacementValue, isGlobal) {
    function cloneObject(obj) {
        var clone = {},
            replaceValue = null,
            findRegEx = new RegExp(valueToFind, (isGlobal ? 'g' : ''));

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
                replaceValue = (obj[key].indexOf(valueToFind) > -1) ? obj[key].replace(findRegEx, replacementValue) : obj[key];

                clone[key] = replaceValue;
            }
        }

        return clone;
    }

    console.log(this.json);

    this.json = cloneObject(this.json);

    console.log(this.json);
};

module.exports = Jafar;