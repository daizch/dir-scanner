# dir-scanner

[![NPM version](https://img.shields.io/npm/v/dir-scanner.svg?style=flat)](https://www.npmjs.com/package/dir-scanner)
[![Build Status](https://secure.travis-ci.org/daizch/dir-scanner.svg?branch=master)](http://travis-ci.org/daizch/dir-scanner)

> To scan all files and directories of someone directory.

## Usage

Firstly, install `dir-scanner` as a development dependency:

```shell
npm install dir-scanner --save
```

**transform the template content of juicer to javascript function:**

```javascript
var Scanner = require("dir-scanner");
var scanner = new Scanner();
    scanner.on('done', function () {
        console.log('done', arguments)
    });
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
