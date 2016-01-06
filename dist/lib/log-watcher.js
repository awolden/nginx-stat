'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _tail = require('tail');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogWatcher = (function (_EventEmitter) {
    _inherits(LogWatcher, _EventEmitter);

    function LogWatcher(opts) {
        _classCallCheck(this, LogWatcher);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LogWatcher).call(this));

        if (!_fs2.default.lstatSync(opts.logFile).isFile()) {
            throw new Error('Unable to find logfile at location: ' + opts.logFile);
        }

        _this.tail = new _tail.Tail(opts.logFile);

        _this.tail.on('line', function (line) {
            this.emit.log('line', line);
        });
        return _this;
    }

    return LogWatcher;
})(_events2.default);

exports.default = LogWatcher;