'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logOpener = require('./lib/log-opener');

var _logOpener2 = _interopRequireDefault(_logOpener);

var _parser = require('./lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _stats = require('./lib/stats');

var _stats2 = _interopRequireDefault(_stats);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOpts = {
    logFormat: '${{remote_addr}} - ${{remote_user}} [${{time_local}}] "${{request}}" ${{status}} ${{body_bytes_sent}} "${{http_referer}}" "${{http_user_agent}}"',
    tail: false,
    logFile: '/var/log/nginx/access.log.1',
    sizeFormat: 'b' //accepts b, m, g
};

var NginxStat = (function (_EventEmitter) {
    _inherits(NginxStat, _EventEmitter);

    function NginxStat(opts) {
        _classCallCheck(this, NginxStat);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NginxStat).call(this));

        _this.opts = _lodash2.default.defaults(opts || {}, defaultOpts);

        _this.parser = new _parser2.default(_this.opts);
        _this.stats = new _stats2.default(_this.opts);

        if (_this.opts.tail) {} else {
            _this.fileReader = new _logOpener2.default(_this.opts);
        }

        _this.startListening();

        return _this;
    }

    _createClass(NginxStat, [{
        key: 'startListening',
        value: function startListening() {
            var _this2 = this;

            this.fileReader.on('line', function (line) {
                _this2.stats.process(_this2.parser.parse(line));
            });
            this.fileReader.on('end', function (line) {
                console.log(_this2.stats.summary, _this2.stats.details);
            });
        }
    }]);

    return NginxStat;
})(_events2.default);

//es5 export

module.exports = NginxStat;