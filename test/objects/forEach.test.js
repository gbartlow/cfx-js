describe('objects', function() {
    describe('forEach', function() {
        it('should iterate correctly', function () {
            var a = {
                a: 'aa',
                b: 'bb',
                c: 'cc',
                d: 'dd',
                e: 'ee'
            };

            cfx.objects.forEach(a, function(elem, k) {
                expect(elem).toEqual(k + k);
            });
        });
    });
});