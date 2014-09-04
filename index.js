var fs = require('fs');

var Jafar = function(opts) {
    var that = this;

    if (!opts.json || (typeof(opts.json) !== 'object' && typeof(opts.json) !== 'string')) {
        throw new Error('You must pass a reference to a valid JSON object/file into Jafar constructor!');
    }

    this.json = (typeof(opts.json) === 'object') ? opts.json : this.parseJsonFile(opts.json);
};

Jafar.prototype.parseJsonFile = function(input) {
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