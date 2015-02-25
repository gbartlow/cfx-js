describe('paths', function() {
    describe('replace', function() {

        describe('all required params', function () {
            it('should replace path params with actual values', function () {
                var string = '/api/:resource';

                string = cfx.paths.format(string, 'cars');

                expect(string).toBe('/api/cars');
            });

            it('should replace path params with actual values', function () {
                var string = '/api/:resource/:id/:subresource';

                string = cfx.paths.format(string, {
                    resource: 'cars',
                    id: 123,
                    subresource: 'wheels'
                });

                expect(string).toBe('/api/cars/123/wheels');
            });
        });

        describe('optional params', function () {
            it('should replace optional path params if values are provided', function () {
                var string = '/api/:resource/:id?/:subresource?';

                string = cfx.paths.format(string, 'cars', 123, 'wheels');

                expect(string).toBe('/api/cars/123/wheels');
            });

            it('should remove optional path params if values are not provided', function () {
                var string = '/api/:resource/:id?/:subresource?';

                string = cfx.paths.format(string, {
                    resource: 'cars'
                });

                expect(string).toBe('/api/cars');
            });
        });

        describe('formatting', function () {
            it('should remove trailing slashes', function () {
                var string = '/api/:resource/:id?/:subresource/';

                string = cfx.paths.format(string, {
                    resource: 'cars',
                    subresource: 'wheels'
                });

                expect(string).toBe('/api/cars/wheels');
            });

            it('should normalize the path', function () {
                var string = '//api\\:resource/:id?/:subresource?';

                string = cfx.paths.format(string, 'cars');

                expect(string).toBe('/api/cars');
            });
        });
    });
});