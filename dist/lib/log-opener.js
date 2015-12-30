'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _events = require('events');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _byline = require('byline');

var _byline2 = _interopRequireDefault(_byline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogOpener = (function (_EventEmitter) {
    _inherits(LogOpener, _EventEmitter);

    function LogOpener(opts) {
        _classCallCheck(this, LogOpener);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LogOpener).call(this));

        if (!_fs2.default.lstatSync(opts.logFile).isFile()) {
            throw new Error('Unable to find logfile at location: ' + opts.logFile);
        }

        _this.readStream = (0, _byline2.default)(_fs2.default.createReadStream(opts.logFile));
        _this.readStream.on('data', function (line) {
            _this.emit('line', line);
        }).on('end', function () {
            _this.emit('end');
        });
        return _this;
    }

    return LogOpener;
})(_events.EventEmitter);

exports.default = LogOpener;