/* Specifies the test environment set up, from Robin Wieruch's soundcloud client.
To create tests, add .spec.js files for each component and run either npm test or npm run test:watch */

var React = require('react');
import { expect } from 'chai';
var jsdom = require('jsdom');

const doc = jsdom.jsdom('<!doctype html> <html> <body> </body> </html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
	if (!(key in global)) {
		global[key] = window[key];
	}
});

global.React = React;
global.expect = expect;