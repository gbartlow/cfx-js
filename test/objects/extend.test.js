describe('objects', function() {
    describe('extend', function() {
        it('should add the given properties', function () {
            var a = { foo: 'bar', bar: 'foo' };

            var b = cfx.objects.extend(a, {
                derp: 'herp'
            });

            expect(b.foo).toEqual(a.foo);
            expect(b.bar).toEqual(a.bar);
            expect(b.derp).toEqual('herp');
        });

        it('should clone the original', function () {
            var a = { foo: 'bar', bar: 'foo' };

            var b = cfx.objects.extend(a, {
                derp: 'herp'
            });
            a.foo = 'a.foo';

            expect(a.foo).toEqual('a.foo');
            expect(b.foo).toEqual('bar');
            expect(b.bar).toEqual(a.bar);
            expect(b.derp).toEqual('herp');
        });

        it('should modify the original', function () {
            var a = { foo: 'bar', bar: 'foo' };

            cfx.objects.extend(a, {
                derp: 'herp'
            }, true);

            expect(a.derp).toEqual('herp');
        });

        it('should use {} as a default for b', function () {
            var a = { foo: 'bar', bar: 'foo' };

            var b = cfx.objects.extend(a);

            expect(a).toEqual(b);
        });
    });
});