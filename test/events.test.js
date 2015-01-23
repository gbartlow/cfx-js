describe('events', function() {

    it('should set & call the listener', function() {
        var fn = jasmine.createSpy();

        cfx.events.on('test', fn);
        cfx.events.broadcast('test', 'foobar', 123);

        expect(fn).toHaveBeenCalledWith('foobar', 123);
    });

    it('should NOT call the listener', function() {
        var fn = jasmine.createSpy();

        cfx.events.on('test', fn);
        cfx.events.broadcast('not-test', 'foobar', 123);

        expect(fn).not.toHaveBeenCalledWith('foobar', 123);
    });

});