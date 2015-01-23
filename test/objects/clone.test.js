describe('objects', function() {
    describe('clone', function() {
        it('a should not equal b', function () {
            var a = { foo: 'bar', bar: 'foo' };

            var b = cfx.objects.clone(a);

            expect(a).not.toBe(b);
            expect(a).toEqual(b);
        });

        it('a should not modify b', function () {
            var a = { foo: 'bar', bar: 'foo' };

            var b = cfx.objects.clone(a);
            a.foo = 'foobar';

            expect(a.foo).toEqual('foobar');
            expect(b.foo).toEqual('bar');
        });

        it('should clone an array', function () {
            var a = [1,2,3];

            var b = cfx.objects.clone(a);
            a[1] = 'two';

            expect(a[1]).toEqual('two');
            expect(b[1]).toEqual(2);
        });

        it('should not fail on a boolean', function () {
            var a = false;

            var b = cfx.objects.clone(a);

            expect(a).toEqual(false);
            expect(b).toEqual(false);
        });

        it('should not fail on a string', function () {
            var a = 'a string';

            var b = cfx.objects.clone(a);
            a = 'not a string...';

            expect(a).toEqual('not a string...');
            expect(b).toEqual('a string');
        });

        it('should fail on undefined', function () {
            var a = undefined;

            var b = cfx.objects.clone(a);
            a = 123;

            expect(a).toEqual(123);
            expect(b).toEqual(undefined);
        });

        it('should fail on null', function () {
            var a = null;

            var b = cfx.objects.clone(a);
            a = 123;

            expect(a).toEqual(123);
            expect(b).toEqual(null);
        });

        it('should fail on function', function () {
            var a = function() {
                return 'b';
            };

            var b = cfx.objects.clone(a);
            a = function() {
                return 'a';
            };

            expect(a()).toEqual('a');
            expect(b()).toEqual('b');
        });
    });
});