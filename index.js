var fs = require('fs');
var util = require('util');
var path = require('path');

var EventEmitter = require('events').EventEmitter;


module.exports = DirScanner;

function DirScanner(config) {
    if (!(this instanceof DirScanner)) {
        return new DirScanner(config);
    }
    EventEmitter.call(this);
    if (typeof config === 'string') {
        config = {
            root: config
        };
    }

    config = config || {};
    config.root = config.root || process.cwd();
    config.exclude = config.exclude || [];
    this._counter = 0;
}

util.inherits(DirScanner, EventEmitter);

function getScanPath(dir) {
    if (path.isAbsolute(dir)) {
        return dir;
    }

    return path.join(process.cwd(), dir);
}

DirScanner.prototype.scan = function (dir, fn) {
    //todo
    var files = this.scanSync(dir);
    this.emit('done', {files: files});

    return files;
}


DirScanner.prototype.scanSync = function (dir) {
    var result = [];
    var self = this;
    dir = getScanPath(dir);

    try {
        var stat = fs.statSync(dir);
        if (stat.isDirectory()) {
            var files = fs.readdirSync(dir);
            files.forEach(function (name) {
                var absPath = path.join(dir, name);
                try {
                    var stat = fs.statSync(absPath);
                    if (stat.isDirectory()) {
                        var list = self.scan(absPath);
                        result.push({
                            path: absPath,
                            type: 'directory',
                            files: list
                        })
                    } else {
                        result.push({
                            path: absPath,
                            type: 'file'
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }
    } catch (err) {
        console.log(err);
    }

    return result;
}