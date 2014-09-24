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

Recurses over `jafar.json` and returns an array of all keys within the JSON.

---

```js
jafar.findKey(key)
```

Returns the index of `key` as it exists within the array returned by `listAllKeys()`.

---

```js
jafar.replaceKey(keyToFind, replacementKey, isExact, isGlobal)
```

Recurses over `jafar.json` and transforms the JSON, replacing `keyToFind` with
`replacementKey`.

If `isExact` is true, the `keyToFind` must be an exact match in order to be replaced.

If `isGlobal` is true, the `keyToFind` will be replaced as many times as it exists
per key (that is, the `g` RegEx flag will be used).

Note that this method will **transform** `jafar.json` into entirely new JSON.

---

```js
jafar.listAllValues()
```

Recurses over `jafar.json` and returns an array of all values within the JSON.

---

```js
jafar.findValue(value)
```

Returns the index of `value` as it exists within the array returned by `listAllValues()`.

---

```js
jafar.replaceValue(valueToFind, replacementValue, isExact, isGlobal)
```

Recurses over `jafar.json` and transforms the JSON, replacing `valueToFind` with
`replacementValue`.

If `isExact` is true, the `valueToFind` must be an exact match in order to be replaced.

If `isGlobal` is true, the `valueToFind` will be replaced as many times as it exists
per value (that is, the `g` RegEx flag will be used).

Note that this method will **transform** `jafar.json` into entirely new JSON.
