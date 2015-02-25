describe('paths', function() {
    describe('queryString', function() {

        it('should work with one value', function () {
            var params = {
                foo: 'bar'
            };

            var string = cfx.paths.queryString(params);

            expect(string).toBe('?foo=bar');
        });

        it('work with multiple values', function () {
            var params = {
                foo: 'bar',
                fizz: 'buzz',
                num: 2
            };

            var string = cfx.paths.queryString(params);

            expect(string).toBe('?foo=bar&fizz=buzz&num=2');
        });

    });
});