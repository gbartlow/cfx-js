# cfx.objects

A collection of methods to handle objects.

## clone(obj)

Creates a deep clone of the object. Changing the original after creating the clone will not affect the clone, and vice-versa.

Works on primitives, objects, and arrays (Date, RegExp, and other exotic structures are not yet supported).

    var a = { foo: 'bar', bar: 'foo' }
    
    var b = cfx.objects.clone(a)
    
    a.foo = 'foobar'
    
    console.log(b)
    >> { foo: 'bar', bar: 'foo' }

## contains(obj, testObj)

Checks whether or not an object contains the specified key-value pairs.

    cfx.objects.contains({ foo: 'bar', bar: 'foo' }, { foo: 'bar' })
    >> true
    
    cfx.objects.contains({ bar: 'foo' }, { foo: 'bar' }) // missing key
    >> false 
    
    cfx.objects.contains({ bar: 'foo' }, { bar: 'bar' }) // value doesn't match
    >> false
     
### Nested tests

This method will work on nested objects

    var a = {
        foo: 'bar',
        bar: { a: 1, b: 2 }
    }

    cfx.objects.contains(a, { 
        bar: { a: 1 } 
    })
    >> true
    
## extend(a, b, [modify])

Creates a new object from the values of `a`, and extends/overwrites with values of`b`.

    cfx.objects.extend({ foo: 'bar', bar: 'foo' }, {
        derp: 'herp',
        foo: 'fiz'
    })
    >> { foo: 'fiz', bar: 'foo', derp: 'herp' }
    
If `modify` is true, the original object will be modified, *NOT* cloned. Useful for modified passed arguments.

    var fn = function(obj, val) {
        cfx.objects.extend(obj, { foo: val }, true)
    }
    
    var a = { foo: 'bar' }
    
    fn(a, 'fiz')
    
    console.log(a)
    >> { foo: 'fiz' }

## forEach(obj, callback)

Loops over every key-value pair in the object, calling the given callback with `(value, key, obj)`
    
    cfx.objects.forEach({ a: 'foo', b: 'bar', c: 'fiz'}, function(value, key, obj) {
        console.log(value, key)
    });
    
    >> 'foo', 'a'
    >> 'bar', 'b'
    >> 'fiz', 'c'
    
## toArray(obj)

Creates an array from each value in the object.

    var obj = {
        a: { foo: 'bar' },
        b: { fiz: 'buz' }
    }
    
    cfx.objects.toArray(obj)
    >> [{foo: 'bar'}, {fiz: 'buz'}]