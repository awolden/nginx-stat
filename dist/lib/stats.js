'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stats = (function () {
    function Stats(opts) {
        _classCallCheck(this, Stats);

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

    _createClass(Stats, [{
        key: 'process',
        value: function process(statObject) {
            var _this = this;

            this.summary.count++;
            this.summary.total_bytes_sent += parseInt(statObject.body_bytes_sent);

            var details = ['remote_addr', 'remote_user',
            //'request',
            'status', 'http_referer', 'http_user_agent'];

            details.forEach(function (detail) {
                if (!_this.details[detail]) _this.details[detail] = {};
                if (_this.details[detail][statObject[detail]]) {
                    _this.details[detail][statObject[detail]]++;
                } else {
                    _this.details[detail][statObject[detail]] = 1;
                }
            });
        }
    }, {
        key: 'formatSize',
        value: function formatSize(int) {}
    }]);

    return Stats;
})();

exports.default = Stats;