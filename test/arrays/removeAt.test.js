describe('arrays', function() {
    describe('removeAt', function() {
        it('should remove an index', function () {
            var a = ['a', 'b', 'c', 'd', 'e'];

            var b = cfx.arrays.removeAt(a, 2);

            expect(b).toEqual(['a', 'b', 'd', 'e']);
        });

        it('should not modify the original array', function () {
            var a = ['a', 'b', 'c', 'd', 'e'];

            var b = cfx.arrays.removeAt(a, 2);

            expect(a).toEqual(['a', 'b', 'c', 'd', 'e']);
        });
    });
});