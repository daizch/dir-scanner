var Scanner = require('..');
var path = require('path');

describe('test dir scanner', function () {
    it('test all files', function (done) {
        var scanner = new Scanner();
        scanner.on('done', function () {
            console.log('done', arguments)
        });

        var result = scanner.scan(path.join(__dirname, './fixtures/dir-1/dir-2/dir-3-1'));
        var flag = 0;

        result.forEach(function (obj) {
            if (obj.type !== 'file') {
                flag = 1;
            }
        })
        done(flag);
    });

    it('test with directory', function (done) {
        var scanner = new Scanner();
        var result = scanner.scan(path.join(__dirname, './fixtures'));
        //todo
        done();
    });
});
