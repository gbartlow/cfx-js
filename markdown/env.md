# cfx.env

A collection of constants and functions to help determine the environment.

## Level Constants ((LOCAL, ALPHA, PROD, etc.))

A handful of Constants to help describe environments.

    cfx.env.LOCAL = 'local'
    cfx.env.DEV = 'dev'
    cfx.env.ALPHA = 'alpha'
    cfx.env.BETA = 'beta'
    cfx.env.PROD = 'prod'
    
## ENV

A 'final' value  that describes the current environment. Set at initialization, and when `cfx.env.determine()` is called.

If code is running on in a local development environment, `cfx.env.ENV` will equal `cfx.env.LOCAL`.

In production, `cfx.env.ENV` will equal `cfx.env.PROD`, etc.

## isBrowser()

Returns `true` if `process.title` equals `'browser'`, otherwise `false`.

Though normally not available in the browser, `process.env` is brought to you by Browserify.

## determine()

Returns the current environment (`cfx.env.LOCAL`, `cfx.env.BETA`, etc.). Will also set `cfx.env.ENV` to this value.