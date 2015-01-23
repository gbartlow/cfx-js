describe('env', function() {
    describe('isBrowser()', function() {
        it('should return false', function() {
            expect( cfx.env.isBrowser() ).toBe(true);
        });
    });

    describe('determine()', function() {
        afterEach(function() {
            cfx.window.domain = 'localhost';
        });

        describe('local', function() {
            afterEach(function() {
                cfx.env.determine();
                expect( cfx.env.ENV ).toEqual(cfx.env.LOCAL);
            });

            it('localhost', function() {
                cfx.window.domain = 'localhost';
            });

            it('my.carfax.com', function() {
                cfx.window.domain = 'my.carfax.com';
            });

            it('mysecure.carfax.com', function() {
                cfx.window.domain = 'mysecure.carfax.com';
            });

            it('mysecured.carfax.com', function() {
                cfx.window.domain = 'mysecured.carfax.com';
            });
        });

        it('should return dev', function() {
            cfx.window.domain = 'dev.carfax.com';
            cfx.env.determine();

            expect( cfx.env.ENV ).toEqual(cfx.env.DEV);
        });

        it('should return alpha', function() {
            cfx.window.domain = 'alpha.carfax.com';
            cfx.env.determine();

            expect( cfx.env.ENV ).toEqual(cfx.env.ALPHA);
        });

        it('should return beta', function() {
            cfx.window.domain = 'beta.carfax.com';
            cfx.env.determine();

            expect( cfx.env.ENV ).toEqual(cfx.env.BETA);
        });

        it('should return prod', function() {
            cfx.window.domain = 'carfax.com';
            cfx.env.determine();

            expect( cfx.env.ENV ).toEqual(cfx.env.PROD);
        });
    });
});