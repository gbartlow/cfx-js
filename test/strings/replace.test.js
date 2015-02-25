describe('strings', function() {
    describe('replace', function() {
        describe('with multiple arguments (index style)', function () {

            it('should replace templated indexes with corresponding argument.', function () {
                var string = 'Hello ${0}!';

                string = cfx.strings.replace(string, 'World');

                expect(string).toBe('Hello World!');
            });

            it('should replace templated indexes with corresponding arguments in multiple uses', function () {
                var string = 'Hello ${0}! Did you know that ${1} + ${1} = ${2}?';

                string = cfx.strings.replace(string, 'World', 2, 4);

                expect(string).toBe('Hello World! Did you know that 2 + 2 = 4?');
            });

            it('should still work with non-numeric keys', function () {
                var string = 'Hello ${subject}! Did you know that ${a} + ${a} = ${b}?';

                string = cfx.strings.replace(string, 'World', 2, 4);

                expect(string).toBe('Hello World! Did you know that 2 + 2 = 4?');
            });
        });

        describe('with an object argument (key-value style)', function () {

            it('should replace templated keys with given value.', function () {
                var string = 'Hello ${subject}!';

                string = cfx.strings.replace(string, {
                    subject: 'World'
                });

                expect(string).toBe('Hello World!');
            });

            it('should replace templated keys with given values, in multiple uses', function () {
                var string = 'Hello ${subject}! Did you know that ${a} + ${a} = ${b}?';

                string = cfx.strings.replace(string, {
                    subject: 'World',
                    a: 2,
                    b: 4
                });

                expect(string).toBe('Hello World! Did you know that 2 + 2 = 4?');
            });
        });

        describe('format()', function() {
            it('should replace templated indexes with corresponding argument.', function () {
                var string = 'Hello #{subject}!',
                    format = cfx.strings.replace.format('#{', '}');

                string = format(string, {
                    subject: 'World'
                });

                expect(string).toBe('Hello World!')
            });

            it('should replace templated indexes with corresponding arguments in multiple uses', function () {
                var string = 'Hello #{subject}! Did you know that #{a} + #{a} = #{b}?',
                    format = cfx.strings.replace.format('#{', '}');

                string = format(string, 'World', 2, 4);

                expect(string).toBe('Hello World! Did you know that 2 + 2 = 4?');
            });
        });

        describe('pattern', function() {
            it('changing this will change all executions', function () {
                var string = 'Hello #{subject}!',
                    original = cfx.strings.replace.pattern;
                cfx.strings.replace.pattern = /#{(.+?)}/g;

                string = cfx.strings.replace(string, {
                    subject: 'World'
                });

                expect(string).toBe('Hello World!');
                cfx.strings.replace.pattern = original;
            });
        });
    });
});