# cfx.strings

Manipulation of strings.

## replace(string, values...)

Interpolates values into a string, using ${KEY} as the format.

Can be used with multiple arguments, or with an object.

    cfx.strings.replace('Hello ${thing}!', 'World')
    >> 'Hello World!'

    cfx.paths.format('Hello ${thing}!', {
        thing: 'World'
    })
    >> 'Hello World!'

If a key is found more than once, it will use the same value for all instances.

    cfx.strings.replace('${a} + ${a} = ${b}', 2, 4)
    >> '2 + 2 = 4'

    cfx.paths.format('${a} + ${a} = ${b}',
        a: 2,
        b: 4
    })
    >> '2 + 2 = 4'

### Custom Formats

Create custom replacement functions with `replace.format(left, right)`. The strings are inserted into a `RegExp` - escape them accordingly.

    var myReplace = cfx.strings.replace.format('#\\[', '\\]')

    myReplace('#[a] + #[a] = #[b]', 2, 4)
    >> '2 + 2 = 4'

    myReplace('#[a] + #[a] = #[b]',
        a: 2,
        b: 4
    });
    >> '2 + 2 = 4'
