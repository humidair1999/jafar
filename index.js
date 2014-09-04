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
    console.log(this.json);
};

module.exports = Jafar;