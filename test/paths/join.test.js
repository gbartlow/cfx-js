describe('paths', function() {
    describe('join', function() {

        it('should join two paths', function () {
            var leading = 'leading/',
                trailing = 'trailing/';

            var result = cfx.paths.join(leading, trailing);

            expect(result).toEqual(leading + trailing);
        });

        it('should join many paths', function () {
            var leading = '/leading',
                middle = '/middle',
                trailing = '/trailing';

            var result = cfx.paths.join(leading, middle, trailing);

            expect(result).toEqual(leading + middle + trailing);
        });

        it('should join replace multiple slashes', function () {
            var leading = '/leading',
                middle = '/middle',
                trailing = '/trailing';

            var result = cfx.paths.join(leading + '/', middle + '/', trailing);

            expect(result).toEqual(leading + middle + trailing);
        });
    });
});