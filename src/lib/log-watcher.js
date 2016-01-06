'use strict';

import 'babel-polyfill';
import _ from 'lodash';
import {Tail} from 'tail';
import fs from 'fs';
import EventEmitter from 'events';

export default class LogWatcher extends EventEmitter {

    constructor(opts) {
        super();
        if (!fs.lstatSync(opts.logFile).isFile()) {
            throw new Error(`Unable to find logfile at location: ${opts.logFile}`);
        }

        this.tail = new Tail(opts.logFile);

        this.tail.on('line', function (line) {
            this.emit.log('line', line);
        });
    }

}
