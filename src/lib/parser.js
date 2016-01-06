//(.*) - (.*) \[(.*)?\] "(.*)" (.*) (.*) "(.*)" "(.*)"

'use strict';

import 'babel-polyfill';
import _ from 'lodash';

let formatRegex = /\$\{\{(\w*)\}\}/gi;

export default class Parser {

    constructor(opts) {
        this.opts = opts;
        this.matchMap = [];
        this.buildRegex(this.opts.logFormat);
    }

    buildRegex(logFormat) {
        if (typeof logFormat !== 'string')
            throw new Error('Log Format must be a string');

        let match;
        while (match = formatRegex.exec(logFormat)) { //jshint ignore:line
            this.matchMap.push(match[1]);
        }
        let directiveRegex = logFormat
            .replace(formatRegex, '__placeholder__')
            .replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
            .replace(/__placeholder__/g, '(.*)');

        this.directive = new RegExp(directiveRegex);

    }

    parse(line) {
        if (line instanceof Buffer) line = line.toString();
        let newStat = {};

        let i = 0;
        let match = this.directive.exec(line);
        if (!match) {
            return;
        }

        this.matchMap.forEach((item) => {
            newStat[item] = match[++i];
        });

        return newStat;
    }

}
