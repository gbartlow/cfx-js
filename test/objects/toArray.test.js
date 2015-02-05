describe('objects', function() {
    describe('toArray', function() {
        it('should convert to an array', function () {
            var obj = {
                a: { foo: 'bar', bar: 'foo' },
                b: { foo: '123', bar: '456' }
            };

            var result = cfx.objects.toArray(obj);

            expect(result).toEqual([obj.a, obj.b]);
        });
    });
});