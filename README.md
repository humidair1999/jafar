<img src="jafar.png" height="200">

# jafar

#### JSON Find and Replace

If you've ever wanted to perform find/replace operations on JSON data structures,
jafar is for you! Find and replace keys and values using a regex-based set of
methods that allow you to easily transform JSON while preserving the structure. No
more awful stringifying/regexing/parsing steps!

### Initialization

Instantiate an instance of jafar with either a reference to a .json file or an actual
JSON structure:

```js
var jafar = new Jafar({
    json: './test/sample.json'
});

// or:

var jafar = new Jafar({
    json: {
        "thing": {
            "another": "somethingsomething"
        },
        "thing2": {
            "another2": "something2"
        },
        "thing3": {
            "thing4": {
                "thing5thing5": "something3"
            }
        }
    }
});
```

`jafar` will be instantiated with a `json` property, which will be transformed when
performing find/replace operations:

```js
jafar.json
```

### Methods

```js
jafar.listAllKeys()
```

Recurses over `jafar.json` and creates an array of all keys within the JSON.

```js
jafar.findKey()
```

```js
jafar.replaceKey()
```

```js
jafar.listAllValues()
```

Recurses over `jafar.json` and creates an array of all values within the JSON.

```js
jafar.findValue()
```

```js
jafar.replaceValue()
```
