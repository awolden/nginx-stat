'use strict';

import 'babel-polyfill';
import _ from 'lodash';
import {
    EventEmitter
}
from 'events';
import fs from 'fs';
import byline from 'byline';

export default class LogOpener extends EventEmitter {

    constructor(opts) {
        super();
        if (!fs.lstatSync(opts.logFile).isFile()) {
            throw new Error(`Unable to find logfile at location: ${opts.logFile}`);
        }

        this.readStream = byline(fs.createReadStream(opts.logFile));
        this.readStream
            .on('data', (line) => {
                this.emit('line', line);
            })
            .on('end',  () => {
                this.emit('end');
            });
    }

}
