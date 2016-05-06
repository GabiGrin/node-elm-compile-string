# node-elm-compile-string [![Build Status](https://travis-ci.org/GabiGrin/node-elm-compile.svg?branch=master)](https://travis-ci.org/GabiGrin/node-elm-compile-string)

Elm compiler as a function - receives a code string and outputs the compiled result as a JS or HTML string using promises.

It'll load some [basic packages](cache/elm-package.json) for you, and do it from cache so it'll run fast.

This should be used only if you want to compile simple Elm code on demand, from a string. Otherwise, see [node-elm-compiler](https://github.com/rtfeldman/node-elm-compiler)

## Install

```
$ npm install --save node-elm-compile-string
```


## Usage

```js
const compileElm = require('node-elm-compile-string');
const elmCode = `
import Html exposing (text)

main =
  text "Hello, World!"
`
nodeElmCompile(elmCompile)
	.then(compiledCode => {
		doCoolThingsWithIt(compiledCode); //compiledCode will hold either the compiled html or js
	}, err => {
		console.error(err);
	});
//=> 'unicorns & rainbows'
```


## API

### nodeElmCompile(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### output

Type: `string`<br>
Default: `html`


## License

MIT © [GabiG](https://github.com/GabiGrin)
