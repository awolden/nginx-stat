'use strict';

import 'babel-polyfill';
import _ from 'lodash';
import LogOpener from './lib/log-opener';
import Parser from './lib/parser';
import Stats from './lib/stats';
import EventEmitter from 'events';

const defaultOpts = {
    logFormat: '${{remote_addr}} - ${{remote_user}} [${{time_local}}] "${{request}}" ${{status}} ${{body_bytes_sent}} "${{http_referer}}" "${{http_user_agent}}"',
    tail: false,
    logFile: '/var/log/nginx/access.log.1',
    sizeFormat: 'b' //accepts b, m, g
};

class NginxStat extends EventEmitter {

    constructor(opts) {
        super();

        this.opts = _.defaults(opts || {}, defaultOpts);

        this.parser = new Parser(this.opts);
        this.stats = new Stats(this.opts);

        if (this.opts.tail) {

        }
        else {
            this.fileReader = new LogOpener(this.opts);
        }

        this.startListening();

    }

    startListening() {
        this.fileReader.on('line', (line) => {
            this.stats.process(this.parser.parse(line));
        });
        this.fileReader.on('end', (line) => {
            console.log(this.stats.summary, this.stats.details);
        });
    }

}

//es5 export
module.exports = NginxStat;
