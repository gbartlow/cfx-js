# cfx.arrays

A collection of methods to handle arrays.

## forEach(array, callback)

Loops over every item in an array, calling the given callback with `(value, index, array)`
    
    cfx.arrays.forEach(['a', 'b', 'c'], function(value, i, array) {
        console.log(value, i)
    });
    
    >> 'a', 0
    >> 'b', 1
    >> 'c', 2

## generate(count, [value])

Generates an array of the given size. If no value is given, then each entry is `undefined`

If the value is NOT a function, then each entry in the array will be a cloned value (not a reference).

    cfx.arrays.generate(3, {foo:'bar'})
    >> [{foo:'bar'}, {foo:'bar'}, {foo:'bar'}]

If the value IS a function, then each entry will be the return value of the function. Your value function will be called with `(index)`

    cfx.arrays.generate(3, function(i) {
        return "index"+i
    })
    >> ['index0', 'index1', 'index2']
    
## remove(array, element)

Removes the element from the array. Does not modify the original array, but returns a clone.

    cfx.arrays.remove(['a', 'b', 'c'], 'b')
    >> ['a', 'c']
    
## removeAt(array, index)

Splices the given index out of the array. Does not modify the original array, but returns a clone.

    cfx.arrays.removeAt(['a', 'b', 'c', 'd'], 1)
    >> ['a', 'c', 'd']
    
## removeWhere(array, callback)

Removes all elements that pass the callback. The callback must return exactly (===) a true boolean value to be considered 'passed'.

    cfx.arrays.removeWhere([1, 2, 3, 4, 5, 6], function(element, i, arr) {
        return element % 2 == 0;
    });
    >> [1, 3, 5]
    
    
## simultaneous(arrays...).forEach(callback)

Iterates over a list of arrays. The callback is called with `(values..., index)` where values is the element in each array at the given index.

    var array1 = [1, 2, 3], 
        array2 = ['a', 'b', 'c']
        
    cfx.arrays.simultaneous(array1, array2).forEach(function(element1, element2, i) {
        console.log(element1, element2, i)
    });
    
    >> 1, 'a', 0
    >> 2, 'b', 1
    >> 3, 'c', 2
    
    