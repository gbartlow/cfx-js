# cfx.paths

Manipulation of string paths.

## join(paths...)

Joins any number of paths together, normalizing slashes (/ vs \\), and removing duplicate slashes.

Does not add or remove leading or trailing slashes.

    cfx.paths.join('/leading', 'trailing/')
    >> '/leading/trailing/'
    
    cfx.paths.join('leading', 'trailing')
    >> 'leading/trailing'
    
Will gracefully handle slashes in the middle of strings

    cfx.paths.join('le/ad/ing', 'tr/ailing')
    >> 'le/ad/ing/tr/ailing'
    
Removes duplicates.

    cfx.paths.join('le///ad//ing', 'tr//ailing')
    >> 'le/ad/ing/tr/ailing'
    
Normalizes all slashes to be forward facing.

    cfx.paths.join('le\ad\\ing', 'tr\\\ailing')
    >> 'le/ad/ing/tr/ailing'

## format(path, params...)

Formats a path with the given params. Can be passed as multiple arguments, or as an object.

    cfx.paths.format('/api/:resource/:id', 'cars', 123)
    >> '/api/cars/123'

    cfx.paths.format('/api/:resource/:id', {
        resource: 'cars',
        id: 123
    })
    >> '/api/cars/123'

Can be used with optional parameters. If a value is not given for the parameter, it will be removed from the path.

    cfx.paths.format('/api/:resource/:id?/:prop?', 'cars', 123)
    >> '/api/cars/123'

    cfx.paths.format('/api/:resource/:id?/:prop?', {
        resource: 'cars',
        id: 123,
        prop: 'wheels'
    })
    >> '/api/cars/123/wheels'

## queryString(values)

Constructs a query string from an object.

    cfx.paths.queryString({
        resource: 'cars',
        id: 123,
        foo: 'bar'
    })
    >> '?resources=cars&id=123&foo=bar'
