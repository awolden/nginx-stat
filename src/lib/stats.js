'use strict';

import 'babel-polyfill';
import _ from 'lodash';


export default class Stats {

    constructor(opts) {
        this.summary = {
            count: 0,
            avg_bytes_sent: 0,
            total_bytes_sent: 0,
            uptime: 0,
            requestRate: 0
        };
        this.details = {
            status: {}
        };
    }

    process(statObject) {

        this.summary.count++;
        this.summary.total_bytes_sent += parseInt(statObject.body_bytes_sent);

        let details = [
            'remote_addr',
            'remote_user',
            //'request',
            'status',
            'http_referer',
            'http_user_agent'
        ];

        details.forEach(detail => {
            if (!this.details[detail])
                this.details[detail] = {};
            if (this.details[detail][statObject[detail]]) {
                this.details[detail][statObject[detail]]++;
            }
            else {
                this.details[detail][statObject[detail]] = 1;
            }
        });


    }

    formatSize(int) {

    }

}
