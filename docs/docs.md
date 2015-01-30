# cfx

This library can be installed via bower, for browser use

    bower install cfx-js

And npm, for use in Node applications, or with Browserify

    npm install cfx-js

To include the code, either

    var cfx = require('cfx-js')

or

    <script src='bower_components/cfx-js/dist/cfx.js'></script>

From that point on, everything in this library will be accessible via the cfx object.

# cfx.arrays

A collection of methods to handle arrays.

## cfx.arrays.forEach
### forEach(array, callback)

Loops over every item in an array, calling the given callback with `(value, index, array)`

## cfx.arrays.generate
### generate(count, [value])

Generates an array of the given size. If no value is given, then each entry is `undefined`

If the value is NOT a function, then each entry in the array will be a cloned value (not a reference).

    cfx.arrays.generate(3, {foo:'bar'})
    >> [{foo:'bar'}, {foo:'bar'}, {foo:'bar'}]

If the value IS a function, then each entry will be the return value of the function. Your value function will be called with `(index)`

    cfx.arrays.generate(3, function(i) {
        return "index"+i
    })
    >> ['index0', 'index1', 'index2']