import fs from 'fs';
import path from 'path';

import test from 'ava';
import fn from './';

const getFixture = file => fs.readFileSync(path.join(__dirname, '/fixtures/', file), 'utf-8');

test('should compile simple commands to html code', t => {
	const source = getFixture('Hello.elm');
	// t.regex('dfgdfgdfg', /g/);
	return fn(source, {output: 'html'}).then(result => {
		t.ok(/Hello, World/.test(result));
		t.ok(/<html>/.test(result));
	});
});

test('should throw an error on unsupported output type', t => {
	const source = getFixture('Hello.elm');
	t.throws(fn(source, {output: 'blabla'}));
});

test('should compile simple commands to js code', t => {
	const source = getFixture('Hello.elm');
	return fn(source, {output: 'js'}).then(result => {
		t.ok(/Hello, World/.test(result));
		t.ok(!/<html>/.test(result));
	});
});

test('should throw compiler errors', t => {
	const source = getFixture('Bad.elm');
	return fn(source).catch(err => {
		t.ok(/missingVariable/.test(err));
		t.ok(/NAMING ERROR/.test(err));
	});
});
