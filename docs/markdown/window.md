# cfx.window

Polyfills for cross-browser functionality, and aliases for easy testing.

## domain

Alias for `window.location.hostname`

Useful for mocking the domain in tests (as changing `location.hostname` will redirect the window).

Your other functions should check the alias, too, to make use of it.

    function isTestServer() {
        return cfx.window.domain.indexOf('test.') > -1
    }

    it('test.domain.com', function() {
        cfx.window.domain = 'test.domain.com'
        
        expect( isTestServer() ).toEqual( true )
    });

## path

Alias for `window.location.pathname`. Useful for testing, see `cfx.window.domain` for a similar example.

## redirect(url)

Redirects the current window to the given URL.