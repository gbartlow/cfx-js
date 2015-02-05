describe('objects', function() {
    describe('contains', function() {
        it('b should should contain a', function () {
            var a = { foo: 'bar', bar: 'foo' };

            var result = cfx.objects.contains(a, { foo: 'bar' });

            expect(result).toBe(true);
        });

        it('b should NOT should contain a', function () {
            var a = { foo: 'bar' };

            var result = cfx.objects.contains(a, { foo: 'bar', bar: 'foo' });

            expect(result).toBe(false);
        });

        it('should work on objects inside of objects', function() {
            var a = {
                foo: 'bar',
                bar: {
                    a: 1,
                    b: 2
                }
            };

            var result = cfx.objects.contains(a, {
                bar: {
                    a: 1,
                    b: 2
                }
            });

            expect(result).toBe(true);
        });
    });
});