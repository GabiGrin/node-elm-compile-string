'use strict';
const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
const temp = require('temp').track();
const promisify = require('native-promisify');
const spawn = require('cross-spawn-promise');

const tempDirName = 'node-elm-compiler';

const makeTempDir = () => promisify(temp.mkdir)(tempDirName);

const defaultOptions = {output: 'html'};

const compileElmInDir = (dir, opts) => {
	return spawn('elm-make', ['--yes', 'main.elm', `--output=main.${opts.output}`], {cwd: dir})
		.then(() => dir)
		.catch(err => {
			throw new Error(err.stderr);
		});
};

const copyCachedFilesToDir = (dir) => {
	return new Promise((resolve, reject) => {
		ncp(path.resolve(__dirname, './cache'), dir, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(dir);
			}
		});
	});
};

const writeSourceToElmMainInDir = (source, dir) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(path.join(dir, '/main.elm'), source, 'utf-8', (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(dir);
			}
		});
	});
};

const readIndexFromDir = (dir, opts) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(dir, `/main.${opts.output}`), 'utf-8', function (err, contents) {
			if (err) {
				reject(err);
			} else {
				resolve(contents);
			}
		});
	});
};

module.exports = function compileElm(src, options) {
	const opts = options || defaultOptions;
	return makeTempDir()
	.then(dirName => {
		return writeSourceToElmMainInDir(src, dirName)
			.then(copyCachedFilesToDir)
			.then(dir => {
				return compileElmInDir(dir, opts);
			})
			.then(dir => readIndexFromDir(dir, opts));
	});
};
