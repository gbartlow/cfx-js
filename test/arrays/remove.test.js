describe('arrays', function() {
    describe('removeAt', function() {
        it('should remove an element', function () {
            var a = ['a', 'b', 'c', 'd', 'e'];

            var b = cfx.arrays.remove(a, 'c');

            expect(b).toEqual(['a', 'b', 'd', 'e']);
        });

        it('should not modify the original array', function () {
            var a = ['a', 'b', 'c', 'd', 'e'];

            var b = cfx.arrays.remove(a, 'c');

            expect(a).toEqual(['a', 'b', 'c', 'd', 'e']);
        });
    });
});