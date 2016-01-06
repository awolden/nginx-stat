'use strict';

import 'babel-polyfill';
import _ from 'lodash';
import LogOpener from './lib/log-opener';
import LogWatcher from './lib/log-watcher';
import Parser from './lib/parser';
import Stats from './lib/stats';
import EventEmitter from 'events';

const defaultOpts = {
    logFormat: '${{remote_addr}} - ${{remote_user}} [${{time_local}}] "${{request}}" ${{status}} ${{body_bytes_sent}} "${{http_referer}}" "${{http_user_agent}}"',
    emitLines: false,
    includeHistorical: false,
    logFile: '/var/log/nginx/access.log.1',
    sizeFormat: 'b' //accepts b, m, g
};

class NginxStat extends EventEmitter {

    constructor(opts) {
        super();

        this.opts = _.defaults(opts || {}, defaultOpts);

        this.parser = new Parser(this.opts);
        this.stats = new Stats(this.opts);

        this.startListening();

    }

    update(line) {
        let parsedLine = this.parser.parse(line);
        this.stats.process(parsedLine);
        if (this.opts.emitLines) this.emit('line', this.parser.parse(line));
        this.emit('update', this.stats);
    }

    startListening() {

        this.fileReader = new LogWatcher(this.opts);

        if (this.opts.includeHistorical) {
            this.historicalLoader = new LogOpener(this.opts);
            this.historicalLoader.on('line', (line) => {
                this.update(line);
            });
            this.historicalLoader.on('end', () => {
                this.emit('historyComplete');
            });
        }

        this.fileReader.on('line', (line) => {
            this.update(line);
        });

    }

}

//es5 export
module.exports = NginxStat;
