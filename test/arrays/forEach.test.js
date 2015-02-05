describe('arrays', function() {
    describe('forEach', function() {
        it('should iterate correctly', function () {
            var a = [1,2,3,4,5,6,7,8,9,10];

            cfx.arrays.forEach(a, function(elem, i) {
                expect(elem).toEqual(i + 1);
            });
        });
    });
});