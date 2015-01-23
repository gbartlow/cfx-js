describe('arrays', function() {
    describe('removeWhere', function() {
        it('should remove all elements that match the filter', function () {
            var a = [1, 2, 3, 4, 5, 6];

            var b = cfx.arrays.removeWhere(a, function(element, i, arr) {
                return element % 2 == 0;
            });

            expect(b).toEqual([1, 3, 5]);
        });

        it('should not modify the original array', function () {
            var a = [1, 2, 3, 4, 5, 6];

            var b = cfx.arrays.removeWhere(a, function(element, i, arr) {
                return element % 2 == 0;
            });

            expect(a).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });
});