# node-elm-compile-string [![Build Status](https://travis-ci.org/GabiGrin/node-elm-compile.svg?branch=master)](https://travis-ci.org/GabiGrin/node-elm-compile-string)

Elm compiler as a function - receives a code string and outputs the compiled result as a JS or HTML string using promises.


## Install

```
$ npm install --save node-elm-compile-string
```


## Usage

```js
const nodeElmCompileString = require('node-elm-compile-string');

nodeElmCompile('unicorns');
//=> 'unicorns & rainbows'
```


## API

### nodeElmCompile(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

MIT © [GabiG](https://github.com/GabiGrin)
