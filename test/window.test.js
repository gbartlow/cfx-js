describe('window', function() {
    describe('domain', function() {
        it('should be localhost', function() {
            expect( cfx.window.domain ).toEqual('localhost');
        });
    });

    describe('scrollY()', function() {
        it('should return 0', function() {
            expect( cfx.window.scrollY()).toEqual(0);
        });
    });

    describe('path', function() {
        it('should be /context.html', function() {
            expect( cfx.window.path ).toEqual(window.location.pathname);
        });
    });
});