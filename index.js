var fs = require('fs');
var file = __dirname + '/test.json';
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);
 
  console.dir(data);
});

var Jafar = function(opts) {
    if (!opts.json || (typeof(opts.json) !== 'object' && typeof(opts.json) !== 'string')) {
        throw new Error('You must pass a reference to valid JSON into Jafar constructor!');
    }

    this.parseJson(opts.json);

    this.json = opts.json;
};

Jafar.prototype.parseJson = function(json) {
    console.log(json);
};

Jafar.prototype.printJson = function() {
    console.log(this.json);
};

module.exports = Jafar;